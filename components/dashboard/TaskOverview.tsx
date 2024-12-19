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
	return (
		<Card
			className={cn(
				`p-4 min-w-[18rem] h-[18rem] shadow-none border-none flex-1`
			)}
		>
			<CardHeader>
				<CardTitle className="text-xl">Task Overview</CardTitle>
				<CardDescription>Quick rundown of all tasks</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-start justify-center gap-2 w-ful text-sm">
				<div className="flex justify-between items-center w-full bg-accent/50 py-1 px-2 rounded-md">
					<div className="flex items-center gap-2">
						<ClipboardList size={CARDICONSIZE} />
						<span>Total Tasks</span>
					</div>
					<span>{numTasks}</span>
				</div>
				<div className="flex justify-between items-center w-full bg-accent/50 py-1 px-2 rounded-md">
					<div className="flex items-center gap-2">
						<ListChecks size={CARDICONSIZE} />
						<span>Tasks Completed</span>
					</div>
					<span>{numCompletedTasks}</span>
				</div>
				<div className="flex justify-between items-center w-full bg-accent/50 py-1 px-2 rounded-md">
					<div className="flex items-center gap-2">
						<ListTodo size={CARDICONSIZE} />
						<span>Tasks To Complete</span>
					</div>
					<span>{numTodoTasks}</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default TaskOverview;
