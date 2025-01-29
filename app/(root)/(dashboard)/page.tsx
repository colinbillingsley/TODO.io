"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import CompletedTasksThisWeek from "@/components/dashboard/CompletedTasksThisWeek";
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
	const [weekTasks, setWeekTasks] = useState<Task[]>([]);
	const [numWeekTasks, setNumWeekTasks] = useState(0);
	const [numCompletedWeekTasks, setNumCompletedWeekTasks] = useState(0);
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

	const getWeekTasks = async () => {
		try {
			const res = await fetch(`/api/tasks/user/${user?.id}/week`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				const resWeekTasks: Task[] = await res.json();
				setWeekTasks(resWeekTasks);

				const totalTasks = resWeekTasks.length;
				const completedTasks = resWeekTasks.filter(
					(task) => task.completed === true
				);
				const numCompleted = completedTasks.length;

				setNumWeekTasks(totalTasks);
				setNumCompletedWeekTasks(numCompleted);
				setWeekTasks(resWeekTasks);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getAllData = async () => {
		setLoadingTasks(true);
		await getUserTasks();
		await getTodaysTasks();
		await getWeekTasks();
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
					<div className="w-full grid grid-cols-1 gap-4">
						<TaskOverview
							numTasks={numTasks}
							numCompletedTasks={numCompletedTasks}
							numTodoTasks={numTodoTasks}
						/>
						<div className="w-full grid grid-cols-1 900px:grid-cols-2 gap-4">
							<TasksToday tasks={todaysTasks} />
							<CompletedTasksThisWeek
								tasks={weekTasks}
								numTasks={numWeekTasks}
								numCompletedTasks={numCompletedWeekTasks}
							/>
						</div>
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
