"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import CircleProgressBar from "./CircleProgressBar";

const TaskOverview = ({
	numTasks,
	numCompletedTasks,
	numTodoTasks,
}: {
	numTasks: number;
	numCompletedTasks: number;
	numTodoTasks: number;
}) => {
	const determineCompletedProgress = (total: number, completed: number) => {
		const num = Math.round((completed / total) * 100);
		if (num) return num;
		return 0;
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
					<CircleProgressBar
						progress={determineCompletedProgress(numTasks, numCompletedTasks)}
					/>
				</div>

				<div className="flex flex-col gap-4 items-center justify-center py-1 px-2 rounded-md">
					<span className="text-xl font-medium">Tasks To Complete</span>
					<CircleProgressBar
						progress={determineCompletedProgress(numTasks, numTodoTasks)}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default TaskOverview;
