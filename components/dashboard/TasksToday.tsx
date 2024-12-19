import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, Logs } from "lucide-react";
import Link from "next/link";
import { Priority, Task } from "@prisma/client";

const TasksToday = ({ tasks }: { tasks: Task[] }) => {
	const todaysDate = new Date();

	const displayPriority = (priority: Priority) => {
		switch (priority) {
			case "LOW":
				return (
					<span className="text-sm bg-blue-500/25 text-blue-700 px-3 py-1 rounded-lg">
						Low
					</span>
				);
			case "MEDIUM":
				return (
					<span className="text-sm bg-yellow-400/25 text-yellow-500 px-3 py-1 rounded-lg">
						Medium
					</span>
				);
			case "HIGH":
				return (
					<span className="text-sm bg-red-500/25 text-red-700 px-3 py-1 rounded-lg">
						High
					</span>
				);
			default:
				return (
					<span className="text-sm bg-purple-500/25 text-purple-400 px-3 py-1 rounded-lg">
						Unknown
					</span>
				);
		}
	};

	return (
		<Card
			className={cn(
				`p-4 min-w-[18rem] h-[18rem] shadow-none border-none flex-1`
			)}
		>
			<CardHeader>
				<CardTitle className="text-xl flex items-center justify-between">
					<span>Tasks Today - ({tasks.length})</span>
					<Link
						href={"/todays-tasks"}
						className="p-1 rounded-md hover:bg-accent/25 transition-colors"
					>
						<ChevronRight size={20} />
					</Link>
				</CardTitle>
				<CardDescription>{todaysDate.toDateString()}</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col items-start justify-center gap-2 w-full text-sm">
				{tasks.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-1 w-full text-accent-foreground/50">
						<Logs size={20} />
						<span>No tasks for today!</span>
					</div>
				) : (
					<ul className="w-full flex flex-col gap-2">
						{tasks.map((task, index) => (
							<li
								key={index}
								className="w-full flex justify-between items-center bg-zinc-100/50 p-2 rounded-md"
							>
								<p className="font-medium">{task.title}</p>
								<p>{displayPriority(task.priority)}</p>
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	);
};

export default TasksToday;
