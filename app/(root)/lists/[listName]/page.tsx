"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useAuthContext } from "@/app/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { Priority, Project, Task } from "@prisma/client";
import dayjs from "dayjs";
import SubTitle2 from "@/components/SubTitle2";
import AddTask from "@/components/tasks/AddTask";
import { Logs } from "lucide-react";
import LoadingSpinner from "@/components/login/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFilters from "@/components/tasks/TaskFilters";
import { Input } from "@/components/ui/input";

const ListPage = () => {
	const { user } = useAuthContext();
	const searchParams = useSearchParams();
	const params = useParams();

	const { listName } = params;
	const projectId = searchParams.get("projectId");

	const [listInfo, setListInfo] = useState<Project>({
		name: "",
		id: "",
		description: "",
		userId: "",
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	const [listTasks, setListTasks] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
	const [loadingList, setLoadingList] = useState(false);
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [selectedPriority, setSelectedPriority] = useState<
		Priority | undefined
	>(undefined);
	const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
		undefined
	);
	const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
	const [searchText, setSearchText] = useState<string>("");

	// deconstruct listName param from (xxx-xxx) into (xxx xxx)
	const deconstructListName = (listTitle: string) => {
		return listTitle.split("-").join(" ");
	};

	const formatDateToString = (date: Date) => {
		const formattedDate = dayjs(date).format("ddd, MMMM D, YYYY").toString();
		return formattedDate;
	};

	const sortDatesAscending = (tasks: Task[]) => {
		tasks.sort(
			(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
		);
	};

	const fetchListTasks = async (projectId: string | null) => {
		if (projectId) {
			try {
				setLoadingTasks(true);
				const res = await fetch(`/api/tasks/${projectId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res.ok) {
					const data = await res.json();
					sortDatesAscending(data);
					setListTasks(data);
					setFilteredTasks(data);
					return data;
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoadingTasks(false);
			}
		}
	};

	const fetchList = async (userId: string, listName: string) => {
		try {
			setLoadingList(true);
			const res = await fetch(
				`/api/lists/${userId}/${deconstructListName(listName)}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (res.ok) {
				const data = await res.json();
				setListInfo(data);
				return data;
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingList(false);
		}
	};

	const fetchData = async () => {
		await fetchListTasks(projectId);
		await fetchList(user.id, listName);
	};

	const stripTime = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	};

	const determineTaskFilters = () => {
		let filtered: Task[] = [...listTasks];

		if (selectedPriority) {
			filtered = listTasks.filter((task) => task.priority === selectedPriority);
		}
		if (selectedStatus) {
			filtered = listTasks.filter((task) => task.priority === selectedPriority);
		}
		if (dateFilter) {
			const today = stripTime(new Date());
			filtered = filtered.filter((task) => {
				const taskDate = stripTime(new Date(task.dueDate));
				console.log(taskDate, today);

				switch (dateFilter) {
					case "Today":
						return taskDate.toDateString() === today.toDateString();
					case "This Week":
						const startOfWeek = new Date(today);
						startOfWeek.setDate(today.getDate() - today.getDay());
						const endOfWeek = new Date(startOfWeek);
						endOfWeek.setDate(startOfWeek.getDate() + 6);
						return taskDate >= startOfWeek && taskDate <= endOfWeek;
					case "This Month":
						return (
							taskDate.getMonth() === today.getMonth() &&
							taskDate.getFullYear() === today.getFullYear()
						);
					case "Overdue":
						return taskDate < today;
					default:
						return true; // No date filter applied
				}
			});
		} else {
			sortDatesAscending(filtered);
		}

		if (searchText) {
			const lowerCaseSearch = searchText.toLowerCase();
			filtered = filtered.filter((task) =>
				task.title.toLowerCase().includes(lowerCaseSearch)
			);
		}
		return filtered;
	};

	const clearFilters = () => {
		setSelectedPriority(undefined);
		setSelectedStatus(undefined);
		setDateFilter(undefined);
		setFilteredTasks(listTasks);
	};

	const recontructListName = (title: string) => {
		return title
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const filtered = determineTaskFilters();
		setFilteredTasks(filtered);
	}, [selectedPriority, selectedStatus, dateFilter, searchText, listTasks]);

	return (
		<>
			{loadingList || loadingTasks ? (
				<div className="flex items-center justify-center h-full w-full">
					<span className="flex items-center justify-center">
						<LoadingSpinner size={40} className="mr-4 border-gray-500" />
						Loading...
					</span>
				</div>
			) : (
				<>
					<PageTitle>
						{listName ? recontructListName(listName) : "List Name Not Found"}
					</PageTitle>
					<div className="flex flex-col gap-2 justify-center mb-4">
						<span>{listInfo?.description}</span>
						<span className="text-gray-500">
							{formatDateToString(listInfo.createdAt)}
						</span>
					</div>

					<div className="mt-5 mb-2">
						<SubTitle2>Tasks</SubTitle2>
					</div>

					{/* Filters */}
					<div className="w-full text-center mb-5 flex flex-col lg:flex-row items-center gap-3">
						<AddTask
							projectId={projectId}
							userId={user?.id}
							setListTasks={setListTasks}
						/>

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

					<div className="">
						{filteredTasks.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
								{filteredTasks.map((task, index) => (
									<TaskCard task={task} key={index} />
								))}
							</div>
						) : (
							<div className="w-full h-96 flex flex-col items-center justify-center gap-1 text-accent-foreground/50">
								<Logs size={20} />
								<span>No tasks for list!</span>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default withAuth(ListPage);
