"use client";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Priority, Task } from "@prisma/client";
import LoadingSpinner from "../login/LoadingSpinner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

const EditTask = ({ task }: { task: Task }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [dueDate, setDueDate] = useState<Date | undefined>(task.dueDate);
	const [priority, setPriority] = useState<Priority>(task.priority);

	const [titleError, setTitleError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [errors, setErrors] = useState(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);

	const resetFields = () => {
		setTitle("");
		setDescription("");
		setDueDate(new Date());
		setPriority(Priority.LOW);

		setTitleError(false);
		setDescriptionError(false);
		setDateError(false);
		setErrors(false);
	};

	const determineErrors = async () => {
		// Validate fields
		let hasError = false;

		if (title.trim() === "") {
			setTitleError(true);
			hasError = true;
		}

		if (description?.trim() === "") {
			setDescriptionError(true);
			hasError = true;
		}

		if (!dueDate) {
			setDateError(true);
			hasError = true;
		}

		return hasError;
	};

	const handelCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const errors = await determineErrors();
			if (errors) return;

			const updatedTask = {
				title,
				description,
				dueDate,
				priority,
			};

			const res = await fetch(``, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedTask),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.log(errorData, "Unexpected error occurred adding task.");
				return;
			}

			const data = await res.json();

			toast("Task has been edited", {
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
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button className="p-2 hover:bg-gray-100 transition-colors bg-transparent rounded-full">
					<Pencil size={20} />
				</button>
			</DialogTrigger>
			<DialogContent className="overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Task</DialogTitle>
					<DialogDescription>
						Change any information and click Save Changes to save the edited
						information. Otherwise press cancel to discard any changes made.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-8 px-4">
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
							value={description || ""}
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
								Selected:{" "}
								{dayjs(dueDate).format("ddd, MMMM D, YYYY").toString()}
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
							defaultValue={priority}
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
					<div className="flex items-center justify-end gap-3">
						<Button variant={"outline"} onClick={handelCancel}>
							Cancel
						</Button>
						<Button
							type="submit"
							className="font-semibold"
							disabled={isLoading}
						>
							{isLoading ? (
								<span className="flex items-center justify-center">
									<LoadingSpinner size={20} className="mr-2" />
									Editing task...
								</span>
							) : (
								"Save Changes"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditTask;
