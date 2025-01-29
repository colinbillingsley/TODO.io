"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { ClipboardList, ListChecks, ListTodo } from "lucide-react";
import { Task } from "@prisma/client";
import CircleProgressBar from "./CircleProgressBar";

const CARDICONSIZE = 14;

const TaskOverview = ({
	tasks,
	numTasks,
	numCompletedTasks,
	numTodoTasks,
}: {
	tasks: Task[];
	numTasks: number;
	numCompletedTasks: number;
	numTodoTasks: number;
}) => {
	const determineCompletedProgress = () => {
		return Math.round((numCompletedTasks / numTasks) * 100);
	};

	const determineNonCompletedProgress = () => {
		return Math.round((numTodoTasks / numTasks) * 100);
	};

	return (
		<Card
			className={cn(
				`p-4 min-w-[18rem] h-fit shadow-none border-none flex-1 col-span-full`
			)}
		>
			<CardHeader className="text-center 900px:text-start">
				<CardTitle className="text-xl">Task Overview</CardTitle>
				<CardDescription>Quick rundown of all tasks</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col 900px:flex-row items-center 900px:items-start justify-around gap-4 w-full text-sm">
				<div className="flex flex-col gap-4 items-center justify-center py-1 px-2 rounded-md">
					<div className="flex flex-col items-center justify-center gap-4 900px:gap-8">
						<span className="text-xl font-medium">Total Tasks</span>
						<span className="text-7xl text-primary">{numTasks}</span>
					</div>
				</div>

				<div className="flex flex-col gap-4 items-center justify-center py-1 px-2 rounded-md">
					<span className="text-xl font-medium">Tasks Completed</span>
					<CircleProgressBar progress={determineCompletedProgress()} />
				</div>

				<div className="flex flex-col gap-4 items-center justify-center py-1 px-2 rounded-md">
					<span className="text-xl font-medium">Tasks To Complete</span>
					<CircleProgressBar progress={determineNonCompletedProgress()} />
				</div>
			</CardContent>
		</Card>
	);
};

export default TaskOverview;
