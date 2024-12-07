"use client";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import withAuth from "@/hoc/withAuth";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import LoadingSpinner from "@/components/login/LoadingSpinner";
import ListCard from "@/components/lists/ListCard";
import { List } from "@/types";
import { useListContext } from "@/app/context/ListContext";
import ListFilters from "@/components/lists/ListFilters";
import AddList from "@/components/lists/AddList";
import { Input } from "@/components/ui/input";

const Lists = () => {
	const { user } = useAuthContext();
	const { lists, fetchLists } = useListContext();
	const [isLoading, setIsLoading] = useState(false);
	const [numTasks, setNumTasks] = useState(0);
	const [numTasksLoading, setNumTasksLoading] = useState(false);
	const [listsWithTasks, setListsWithTasks] = useState<
		{ list: List; numTasks: number }[]
	>([]);
	const [filteredLists, setFilteredLists] = useState<
		{ list: List; numTasks: number }[]
	>([]);
	const [dateFilter, setDateFilter] = useState<string | undefined>("");
	const [searchText, setSearchText] = useState<string | undefined>("");

	const sortDatesAscending = (lists: List[]) => {
		lists.sort(
			(a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		);
	};

	const getAllUserLists = async () => {
		setIsLoading(true);
		try {
			if (!user) return;

			const recLists: Array<List> = await fetchLists(user.id);
			console.log(recLists);
			sortDatesAscending(recLists);

			// Fetch task counts for each list
			const listsWithTaskCounts = await Promise.all(
				recLists.map(async (list: List) => {
					const res = await fetch(`/api/tasks/count/${list.id}`, {
						method: "GET",
						headers: { "Content-Type": "application/json" },
					});

					const numTasks = res.ok ? await res.json() : 0;
					return { list, numTasks };
				})
			);

			setListsWithTasks(listsWithTaskCounts);
			setFilteredLists(listsWithTaskCounts);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	const clearFilters = () => {
		setDateFilter(undefined);
	};

	const stripTime = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	};

	const determineFilters = () => {
		let filtered = [...listsWithTasks];
		if (dateFilter) {
			const today = stripTime(new Date());
			filtered = filtered.filter((list) => {
				const listDate = stripTime(new Date(list.list.createdAt));
				console.log(listDate, today);

				switch (dateFilter) {
					case "Today":
						return listDate.toDateString() === today.toDateString();
					case "This Week":
						const startOfWeek = new Date(today);
						startOfWeek.setDate(today.getDate() - today.getDay());
						const endOfWeek = new Date(startOfWeek);
						endOfWeek.setDate(startOfWeek.getDate() + 6);
						return listDate >= startOfWeek && listDate <= endOfWeek;
					case "This Month":
						return (
							listDate.getMonth() === today.getMonth() &&
							listDate.getFullYear() === today.getFullYear()
						);
					case "Previous Months":
						console.log(listDate.getFullYear(), listDate.getMonth());
						return (
							listDate.getFullYear() < today.getFullYear() || // Any previous year
							(listDate.getFullYear() === today.getFullYear() &&
								listDate.getMonth() < today.getMonth()) // Same year, earlier months
						);
					default:
						return true; // No date filter applied
				}
			});
		}
		if (searchText) {
			const lowerCaseSearch = searchText.toLowerCase();
			filtered = filtered.filter((list) =>
				list.list.name.toLowerCase().includes(lowerCaseSearch)
			);
		}
		return filtered;
	};

	useEffect(() => {
		getAllUserLists();
	}, []);

	useEffect(() => {
		const filtered = determineFilters();
		setFilteredLists(filtered);
	}, [searchText, dateFilter]);

	useEffect(() => {
		console.log("lists changed", lists);
	}, [lists]);

	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center h-full w-full">
					<span className="flex items-center justify-center">
						<LoadingSpinner size={40} className="mr-4 border-gray-500" />
						Loading...
					</span>
				</div>
			) : (
				<>
					<PageTitle>Lists</PageTitle>
					<div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
						<div className="flex items-center gap-3">
							<AddList variant={"default"} className="h-fit py-2" />
							<ListFilters
								dateFilter={dateFilter}
								setDateFilter={setDateFilter}
								clearFilters={clearFilters}
							/>
						</div>
						<Input
							type="input"
							placeholder="Search"
							className="ml-auto h-fit py-2 bg-white"
							onChange={(e) => {
								setSearchText(e.target.value);
							}}
						/>
					</div>
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
						{filteredLists.length > 0
							? filteredLists.map(({ list, numTasks }, index) => (
									<ListCard list={list} numTasks={numTasks} key={index} />
							  ))
							: ""}
					</div>
				</>
			)}
		</>
	);
};

export default withAuth(Lists);
