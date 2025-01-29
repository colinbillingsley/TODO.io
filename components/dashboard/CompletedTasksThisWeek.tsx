import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { Progress } from "@/components/ui/progress";
import { CheckCheck } from "lucide-react";
import dayjs from "dayjs";

const CARDICONSIZE = 23;

const CompletedTasksThisWeek = ({
	tasks,
	numTasks,
	numCompletedTasks,
}: {
	tasks: Task[];
	numTasks: number;
	numCompletedTasks: number;
}) => {
	const [progress, setProgress] = useState(numCompletedTasks);

	useEffect(() => {
		setProgress(numCompletedTasks);
	}, [tasks]);

	const startOfWeek = dayjs().startOf("week"); // Sunday
	const endOfWeek = dayjs().endOf("week"); // Saturday

	const weekText = `${startOfWeek.format("MMMM D")} - ${endOfWeek.format(
		"MMMM D"
	)}`;

	return (
		<Card
			className={cn(
				`p-4 min-w-[18rem] h-[18rem] shadow-none border-none flex-1`
			)}
		>
			<CardHeader>
				<CardTitle className="text-xl flex items-center justify-between">
					Tasks Completed This Week
					<CheckCheck size={CARDICONSIZE} color="green" />
				</CardTitle>
				<CardDescription className="flex flex-col items-start justify-start gap-3">
					<span className="text-lg">{weekText}</span>
					<span>
						{numCompletedTasks} of {numTasks} tasks completed
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-start justify-center gap-2 w-ful text-sm">
				<div className="flex justify-between items-center w-full bg-accent/50 py-1 px-2 rounded-md">
					<Progress value={(progress / numTasks) * 100} className="" />
				</div>
			</CardContent>
		</Card>
	);
};

export default CompletedTasksThisWeek;
