"use client";
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
import { Logs } from "lucide-react";

export interface ListWithNum {
	list: List;
	numTasks: number;
}

const Lists = () => {
	const { user } = useAuthContext();
	const { fetchLists } = useListContext();
	const [isLoading, setIsLoading] = useState(false);

	const [lists, setLists] = useState<List[]>([]);
	const [listsWithTaskCounts, setListWithTaskCounts] = useState<ListWithNum[]>(
		[]
	);
	const [filteredLists, setFilteredLists] = useState<ListWithNum[]>([]);

	const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
	const [searchText, setSearchText] = useState<string | undefined>("");

	const sortDatesAscending = (lists: ListWithNum[] | null) => {
		if (lists) {
			lists.sort(
				(a, b) =>
					new Date(a.list.createdAt).getTime() -
					new Date(b.list.createdAt).getTime()
			);
		}
	};

	const sortDatesDescending = (lists: ListWithNum[] | null) => {
		if (lists) {
			lists.sort(
				(a, b) =>
					new Date(b.list.createdAt).getTime() -
					new Date(a.list.createdAt).getTime()
			);
		}
	};

	const getListTaskAmounts = async (lists: List[]) => {
		let allListsWithNum: ListWithNum[] = [];
		await Promise.all(
			lists.map(async (list: List) => {
				const res = await fetch(`/api/tasks/count/${list.id}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				const numTasks = res.ok ? await res.json() : 0;
				allListsWithNum.push({ list, numTasks });
			})
		);
		return allListsWithNum;
	};

	const getAllUserLists = async () => {
		setIsLoading(true);
		try {
			if (!user) return;

			const recLists: List[] = await fetchLists(user.id);
			setLists([...recLists]);

			// Fetch task counts for each list
			const resLists: ListWithNum[] = await getListTaskAmounts(recLists);

			setListWithTaskCounts(resLists);
			setFilteredLists(resLists);
			sortDatesAscending(resLists);
			setFilteredLists(resLists);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	const getAllListData = async () => {
		await getAllUserLists();
	};

	const clearFilters = () => {
		setDateFilter(undefined);
	};

	const determineFilters = () => {
		let filtered: ListWithNum[] = [...listsWithTaskCounts];
		if (dateFilter) {
			switch (dateFilter) {
				case "ascending":
					sortDatesAscending(filtered);
					break;
				case "descending":
					sortDatesDescending(filtered);
					break;
				default:
					break; // No date filter applied
			}
		} else {
			sortDatesAscending(filtered);
		}

		if (searchText) {
			const lowerCaseSearch = searchText.toLowerCase();
			filtered = filtered.filter((list) =>
				list.list.name.toLowerCase().includes(lowerCaseSearch)
			);
		}
		return filtered || [];
	};

	useEffect(() => {
		getAllListData();
	}, []);

	useEffect(() => {
		const filtered = determineFilters();
		setFilteredLists(filtered);
	}, [searchText, dateFilter, lists]);

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
							<AddList
								variant={"default"}
								className="h-fit py-2"
								setLists={setLists}
								setFilteredLists={setFilteredLists}
							/>
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
					{filteredLists.length > 0 ? (
						<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-5">
							{filteredLists.map(({ list, numTasks }, index) => (
								<ListCard
									list={list}
									numTasks={numTasks}
									key={index}
									setLists={setLists}
									filteredLists={filteredLists}
									setFilteredLists={setFilteredLists}
								/>
							))}
						</div>
					) : (
						<div className="w-full h-full flex flex-col items-center justify-center gap-1 text-accent-foreground/50 bg-white/75 rounded-md mt-5">
							<Logs size={20} />
							<span>No lists have been created!</span>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default withAuth(Lists);
