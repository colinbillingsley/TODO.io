"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import TaskOverview from "@/components/dashboard/TaskOverview";
import TasksToday from "@/components/dashboard/TasksToday";
import LoadingSpinner from "@/components/login/LoadingSpinner";
import PageTitle from "@/components/PageTitle";
import withAuth from "@/hoc/withAuth";
import { Task } from "@prisma/client";
import { useEffect, useState } from "react";

function Home() {
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [numTasks, setNumTasks] = useState(0);
	const [numCompletedTasks, setNumCompletedTasks] = useState(0);
	const [numTodoTasks, setNumTodoTasks] = useState(0);
	const { user } = useAuthContext();

	const getUserTasks = async () => {
		try {
			const res = await fetch(`/api/tasks/user/${user?.id}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				const allTasks: Task[] = await res.json();
				const totalTasks = allTasks.length;
				const completedTasks = allTasks.filter(
					(task) => task.completed === true
				);
				const numCompleted = completedTasks.length;

				setNumTasks(totalTasks);
				setNumCompletedTasks(numCompleted);
				setNumTodoTasks(totalTasks - numCompleted);
				setTasks(allTasks);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getTodaysTasks = async () => {
		try {
			const res = await fetch(`/api/tasks/user/${user?.id}/today`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				const resTodayTasks = await res.json();
				setTodaysTasks(resTodayTasks);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getAllData = async () => {
		setLoadingTasks(true);
		await getUserTasks();
		await getTodaysTasks();
		setLoadingTasks(false);
	};

	useEffect(() => {
		getTodaysTasks();
	}, []);

	useEffect(() => {
		getAllData();
	}, []);

	return (
		<>
			{!loadingTasks ? (
				<>
					<PageTitle>Dashboard</PageTitle>
					<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
						<TaskOverview
							tasks={tasks}
							numTasks={numTasks}
							numCompletedTasks={numCompletedTasks}
							numTodoTasks={numTodoTasks}
						/>
						<TasksToday tasks={todaysTasks} />
					</div>
				</>
			) : (
				<div className="flex items-center justify-center h-full w-full">
					<span className="flex items-center justify-center">
						<LoadingSpinner size={40} className="mr-4 border-gray-500" />
						Loading...
					</span>
				</div>
			)}
		</>
	);
}

export default withAuth(Home);
