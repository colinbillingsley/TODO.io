"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingSpinner from "../login/LoadingSpinner";
import { Task } from "@prisma/client";
import { Priority } from "@prisma/client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import dayjs from "dayjs";
import { toast } from "sonner";

const AddTaskForm = ({
	projectId,
	userId,
	setListTasks,
	setIsOpen,
}: {
	projectId: string;
	userId: string;
	setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	setIsOpen: (param: boolean) => void;
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
	const [priority, setPriority] = useState<Priority>(Priority.LOW);

	const [titleError, setTitleError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [dateError, setDateError] = useState(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const determineErrors = async () => {
		// Validate fields
		let hasError = false;

		if (title.trim() === "") {
			setTitleError(true);
			hasError = true;
		}

		if (description.trim() === "") {
			setDescriptionError(true);
			hasError = true;
		}

		if (!dueDate) {
			setDateError(true);
			hasError = true;
		}

		return hasError;
	};

	const addTask = (newTask: Task) => {
		setListTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const errors = await determineErrors();
			if (errors) return;

			const newTask = {
				title,
				description,
				dueDate,
				priority,
			};

			const res = await fetch(`/api/tasks/create/${projectId}/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTask),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.log(errorData, "Unexpected error occurred adding task.");
				return;
			}

			const data = await res.json();
			addTask(data);
			setIsOpen(false);
			toast("Task has been created", {
				description: `${dayjs(data.createdAt)
					.format("dddd, MMMM DD, YYYY [at] h:mm A")
					.toString()}`,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8 w-full">
			<div>
				<label
					className={`block text-sm font-semibold mb-2 ${
						titleError ? "text-red-500" : ""
					}`}
				>
					Title*
				</label>
				<Input
					placeholder="Enter task title"
					value={title}
					onChange={(e) => {
						setTitleError(false);
						setTitle(e.target.value);
					}}
					className={`${titleError ? "border-red-500" : ""}`}
				/>
				{titleError && (
					<span className="text-red-500 text-sm mt-2 block">
						Please enter a title.
					</span>
				)}
			</div>

			{/* Description */}
			<div>
				<label
					className={`block text-sm font-semibold mb-2 ${
						descriptionError ? "text-red-500" : ""
					}`}
				>
					Description*
				</label>
				<Textarea
					placeholder="Enter task description"
					value={description}
					onChange={(e) => {
						setDescriptionError(false);
						setDescription(e.target.value);
					}}
					rows={2}
					className={`${descriptionError ? "border-red-500" : ""}`}
				/>
				{descriptionError && (
					<span className="text-red-500 text-sm mt-2 block">
						Please enter a description.
					</span>
				)}
			</div>

			{/* Due Date */}
			<div className="flex flex-col justify-center items-center">
				<label
					className={`block text-sm font-semibold mb-2 self-start ${
						dateError ? "text-red-500" : ""
					}`}
				>
					Due Date*
				</label>
				<Calendar
					mode="single"
					selected={dueDate}
					onSelect={(date) => {
						setDueDate(date);
						setDateError(false);
					}}
					className={`${
						dateError ? "border border-red-500" : ""
					} shadow-md rounded-md mb-2`}
				/>
				{dueDate && (
					<p className="text-sm text-gray-500 mt-1">
						Selected: {dayjs(dueDate).format("ddd, MMMM D, YYYY").toString()}
					</p>
				)}
				{dateError && (
					<span className="text-red-500 text-sm mt-2 block">
						Please select a date.
					</span>
				)}
			</div>

			{/* Priority */}
			<div>
				<label className="block text-sm font-semibold mb-2">Priority</label>
				<Select
					onValueChange={(value) => setPriority(value as Priority)}
					defaultValue={Priority.LOW}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={Priority.LOW}>Low</SelectItem>
						<SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
						<SelectItem value={Priority.HIGH}>High</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Submit Button */}
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? (
					<span className="flex items-center justify-center">
						<LoadingSpinner size={20} className="mr-2" />
						Creating task...
					</span>
				) : (
					"Create Task"
				)}
			</Button>
		</form>
	);
};

export default AddTaskForm;
