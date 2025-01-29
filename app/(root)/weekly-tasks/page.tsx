"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import LoadingSpinner from "@/components/login/LoadingSpinner";
import PageTitle from "@/components/PageTitle";
import TaskCard from "@/components/tasks/TaskCard";
import withAuth from "@/hoc/withAuth";
import { Priority, Task } from "@prisma/client";
import { Logs } from "lucide-react";
import { useEffect, useState } from "react";
import {
	sortDatesAscending,
	sortDatesCreatedAscending,
	sortDatesCreatedDescending,
	sortDatesDescending,
} from "../lists/[listName]/page";
import TaskFilters from "@/components/tasks/TaskFilters";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";

const UpcomingTasks = () => {
	const [loadingTasks, setLoadingTasks] = useState(false);
	const { user } = useAuthContext();

	const [tasks, setTasks] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

	const [selectedPriority, setSelectedPriority] = useState<
		Priority | undefined
	>(undefined);
	const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
		undefined
	);
	const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
	const [searchText, setSearchText] = useState<string>("");

	const startOfWeek = dayjs().startOf("week"); // Sunday
	const endOfWeek = dayjs().endOf("week"); // Saturday

	const weekText = `${startOfWeek.format("MMMM D")} - ${endOfWeek.format(
		"MMMM D"
	)}`;

	const clearFilters = () => {
		setSelectedPriority(undefined);
		setSelectedStatus(undefined);
		setDateFilter(undefined);
	};

	const getUpcomingTasks = async () => {
		setLoadingTasks(true);
		try {
			const res = await fetch(`/api/tasks/user/${user?.id}/week`, {
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

	const determineTaskFilters = () => {
		let filtered: Task[] = [...tasks];

		if (selectedPriority) {
			filtered = filtered.filter((task) => task.priority === selectedPriority);
		}
		if (selectedStatus) {
			filtered = filtered.filter(
				(task) => task.completed.toString() === selectedStatus
			);
		}
		if (dateFilter) {
			switch (dateFilter) {
				case "ascending":
					sortDatesAscending(filtered);
					break;
				case "descending":
					sortDatesDescending(filtered);
					break;
				case "createdAscending":
					sortDatesCreatedAscending(filtered);
					break;
				case "createdDescending":
					sortDatesCreatedDescending(filtered);
					break;
				default:
					break; // No date filter applied
			}
		} else {
			sortDatesAscending(filtered);
		}

		if (searchText) {
			const lowerCaseSearch = searchText.toLowerCase();
			filtered = filtered.filter((task) =>
				task.title.toLowerCase().includes(lowerCaseSearch)
			);
		}
		return filtered || [];
	};

	useEffect(() => {
		getUpcomingTasks();
	}, []);

	useEffect(() => {
		const filtered = determineTaskFilters();
		setFilteredTasks(filtered);
	}, [selectedPriority, selectedStatus, dateFilter, searchText, tasks]);

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
					<PageTitle>Weekly Tasks</PageTitle>
					<span className="text-xl">{weekText}</span>
					<div className="w-full text-center my-5 flex flex-col lg:flex-row items-center gap-3">
						<TaskFilters
							selectedPriority={selectedPriority}
							selectedStatus={selectedStatus}
							dateFilter={dateFilter}
							setSelectedPriority={setSelectedPriority}
							setSelectedStatus={setSelectedStatus}
							setDateFilter={setDateFilter}
							clearFilters={clearFilters}
						/>
						<Input
							type="input"
							placeholder="Search..."
							className="ml-auto h-fit py-2 bg-white"
							onChange={(e) => {
								setSearchText(e.target.value);
							}}
						/>
					</div>
					{filteredTasks.length > 0 ? (
						<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
							{filteredTasks.map((task, index) => (
								<TaskCard task={task} key={index} setListTasks={setTasks} />
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
