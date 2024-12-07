"use client";
import React, { useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import {
	ClipboardList,
	ListChecks,
	ListTodo,
	ChevronRight,
	Logs,
} from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";

const CARDICONSIZE = 14;

const TaskOverview = () => {
	const tasks = [];
	const { currentUser } = useAuthContext();
	const user = currentUser();

	const fetchAllUserTasks = async () => {
		const route: string = `/api/user/${user?.id}/tasks`;
		try {
			const res: Response = await fetch(route);
			const data = await res.json();
		} catch (error) {
			console.error("Error fetching tasks:", error);
			return null;
		}
	};

	// useEffect(() => {
	// 	fetchAllUserTasks();
	// }, [user]);

	const todaysDate = new Date();

	return (
		<div className="w-full h-full flex gap-2 flex-wrap items-start justify-start">
			<Card
				className={cn(`p-4 min-w-[18rem] h-fit shadow-none border-none flex-1`)}
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
						<span>0</span>
					</div>
					<div className="flex justify-between items-center w-full bg-accent/50 py-1 px-2 rounded-md">
						<div className="flex items-center gap-2">
							<ListChecks size={CARDICONSIZE} />
							<span>Tasks Completed</span>
						</div>
						<span>0</span>
					</div>
					<div className="flex justify-between items-center w-full bg-accent/50 py-1 px-2 rounded-md">
						<div className="flex items-center gap-2">
							<ListTodo size={CARDICONSIZE} />
							<span>Tasks To Complete</span>
						</div>
						<span>0</span>
					</div>
				</CardContent>
			</Card>

			<Card
				className={cn(`p-4 min-w-[18rem] h-fit shadow-none border-none flex-1`)}
			>
				<CardHeader>
					<CardTitle className="text-xl flex items-center justify-between">
						<span>Tasks Today</span>
						<Link
							href={"/todays-tasks"}
							className="p-1 rounded-md hover:bg-accent/25 transition-colors"
						>
							<ChevronRight size={20} />
						</Link>
					</CardTitle>
					<CardDescription>{todaysDate.toDateString()}</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-start justify-center gap-2 w-ful text-sm">
					{tasks.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-1 w-full text-accent-foreground/50">
							<Logs size={20} />
							<span>No tasks for today!</span>
						</div>
					) : (
						""
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default TaskOverview;
