"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import LoadingSpinner from "@/components/login/LoadingSpinner";
import PageTitle from "@/components/PageTitle";
import TaskCard from "@/components/tasks/TaskCard";
import withAuth from "@/hoc/withAuth";
import { Task } from "@prisma/client";
import { Logs } from "lucide-react";
import { useEffect, useState } from "react";

const UpcomingTasks = () => {
	const [loadingTasks, setLoadingTasks] = useState(false);
	const { user } = useAuthContext();
	const [tasks, setTasks] = useState<Task[]>([]);

	const sortDatesAscending = (tasks: Task[]) => {
		tasks.sort(
			(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
		);
	};

	const getUpcomingTasks = async () => {
		setLoadingTasks(true);
		try {
			const res = await fetch(`/api/tasks/user/${user?.id}/upcoming`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				const upcomingTasks = await res.json();
				sortDatesAscending(upcomingTasks);
				setTasks(upcomingTasks);
			}
			setLoadingTasks(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUpcomingTasks();
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
					<PageTitle>Upcoming Tasks</PageTitle>
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
						<div className="w-full h-full flex flex-col items-center justify-center gap-1 text-accent-foreground/50 bg-white/75 rounded-md mt-5">
							<Logs size={20} />
							<span>No upcoming tasks this week!</span>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default withAuth(UpcomingTasks);
