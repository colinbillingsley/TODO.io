"use client";
import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Priority, Task } from "@prisma/client";
import dayjs from "dayjs";
import { Check, CircleX, Pencil, X } from "lucide-react";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

const TaskCard = ({ task }: { task: Task }) => {
	const [completed, setCompleted] = useState(task.completed);

	const displayPriority = (priority: Priority) => {
		switch (priority) {
			case "LOW":
				return (
					<span className="text-sm font-semibold bg-blue-500 text-white px-3 py-1 rounded-lg">
						Low
					</span>
				);
			case "MEDIUM":
				return (
					<span className="text-sm font-semibold bg-yellow-400 text-white px-3 py-1 rounded-lg">
						Medium
					</span>
				);
			case "HIGH":
				return (
					<span className="text-sm font-semibold bg-red-500 text-white px-3 py-1 rounded-lg">
						High
					</span>
				);
			default:
				return (
					<span className="text-sm font-semibold bg-purple-100 text-purple-400 px-3 py-1 rounded-lg">
						Unknown
					</span>
				);
		}
	};

	const displayCompleted = (completed: boolean) => {
		switch (completed) {
			case true:
				return (
					<span className="text-sm font-semibold bg-green-500 text-white px-3 py-1 rounded-lg">
						Completed
					</span>
				);
			case false:
				return (
					<span className="text-sm font-semibold bg-purple-500 text-white px-3 py-1 rounded-lg">
						To-Do
					</span>
				);
			default:
				return (
					<span className="text-sm font-semibold bg-pink-500 text-white px-3 py-1 rounded-lg">
						Unknown
					</span>
				);
		}
	};

	const markTaskAsCompleted = () => {
		setCompleted(!completed);
	};

	const truncateText = (text: string | null, maxLength: number) => {
		if (text) {
			return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
		}
		return "No description found.";
	};

	return (
		<Card className="h-full flex flex-col">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="">{task.title}</CardTitle>
					<div className="flex items-center justify-start gap-2">
						<TooltipProvider>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<button className="p-2 hover:bg-gray-100 transition-colors bg-transparent rounded-full">
										<Pencil size={20} />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Edit</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									{completed ? (
										<button
											className="p-2 hover:bg-gray-100 transition-colors bg-transparent rounded-full"
											onClick={markTaskAsCompleted}
										>
											<X size={20} />
										</button>
									) : (
										<button
											className="p-2 hover:bg-gray-100 transition-colors bg-transparent rounded-full"
											onClick={markTaskAsCompleted}
										>
											<Check size={20} />
										</button>
									)}
								</TooltipTrigger>
								<TooltipContent>
									{completed ? <p>Mark as To-do</p> : <p>Mark as complete</p>}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
				<CardDescription>
					<span className="text-primary font-bold bg-primary/25 px-2 py-1 rounded-sm">
						{dayjs(task.dueDate).format("MMMM D, YYYY").toString()}
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-between h-full">
				<div className="mb-3">
					<span>{truncateText(task.description, 150)}</span>
				</div>
				<div className="flex items-end justify-end gap-3 self-end">
					{displayPriority(task.priority)}
					{displayCompleted(completed)}
				</div>
			</CardContent>
		</Card>
	);
};

export default TaskCard;
