"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import LoadingSpinner from "@/components/login/LoadingSpinner";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import TaskCard from "@/components/tasks/TaskCard";
import withAuth from "@/hoc/withAuth";
import { Task } from "@prisma/client";
import { Logs } from "lucide-react";
import React, { useEffect, useState } from "react";

const TodaysTasks = () => {
	const [loadingTasks, setLoadingTasks] = useState(false);
	const { user } = useAuthContext();
	const [tasks, setTasks] = useState<Task[]>([]);

	const getTodaysTasks = async () => {
		setLoadingTasks(true);
		try {
			const res = await fetch(`/api/tasks/user/${user?.id}/today`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				const todaysTasks = await res.json();
				setTasks(todaysTasks);
			}
			setLoadingTasks(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getTodaysTasks();
	}, []);

	return (
		<>
			{loadingTasks ? (
				<div className="flex items-center justify-center h-full w-full">
					<span className="flex items-center justify-center">
						<LoadingSpinner size={40} className="mr-4 border-gray-500" />
						Loading...
					</span>
				</div>
			) : (
				<>
					<PageTitle>Today&apos;s Tasks</PageTitle>
					{tasks.length > 0 ? (
						<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
							{tasks.map((task, index) => (
								<TaskCard
									task={task}
									key={index}
									listTasks={tasks}
									setListTasks={setTasks}
								/>
							))}
						</div>
					) : (
						<div className="w-full h-96 flex flex-col items-center justify-center gap-1 text-accent-foreground/50">
							<Logs size={20} />
							<span>No tasks for today!</span>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default withAuth(TodaysTasks);
