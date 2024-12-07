"use client";
import React, { SetStateAction } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Priority } from "@prisma/client";
import { Button } from "../ui/button";

const TaskFilters = ({
	selectedPriority,
	selectedStatus,
	dateFilter,
	setSelectedPriority,
	setSelectedStatus,
	setDateFilter,
	clearFilters,
}: {
	selectedPriority: Priority | undefined;
	selectedStatus: string | undefined;
	dateFilter: string | undefined;
	setSelectedPriority: React.Dispatch<SetStateAction<Priority | undefined>>;
	setSelectedStatus: React.Dispatch<SetStateAction<string | undefined>>;
	setDateFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
	clearFilters: () => void;
}) => {
	return (
		<div className="w-full flex flex-col lg:flex-row items-center gap-3">
			<Select
				key={selectedPriority || "priority-default"}
				value={selectedPriority || undefined}
				onValueChange={(value) => setSelectedPriority(value as Priority)}
			>
				<SelectTrigger className="w-full lg:max-w-48 bg-white">
					<SelectValue placeholder="Filter by Priority" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={Priority.LOW}>Low</SelectItem>
					<SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
					<SelectItem value={Priority.HIGH}>High</SelectItem>
				</SelectContent>
			</Select>

			<Select
				key={selectedStatus || "status-default"}
				value={selectedStatus || undefined}
				onValueChange={(value) => setSelectedStatus(value)}
			>
				<SelectTrigger className="w-full lg:max-w-48 bg-white">
					<SelectValue placeholder="Filter by Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={"false"}>To-Do</SelectItem>
					<SelectItem value={"true"}>Completed</SelectItem>
				</SelectContent>
			</Select>

			<Select
				key={dateFilter || "dateFilter-default"}
				value={dateFilter || undefined}
				onValueChange={(value) => setDateFilter(value)}
			>
				<SelectTrigger className="w-full lg:max-w-48 bg-white">
					<SelectValue placeholder="Filter by Due Date" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Today">Today</SelectItem>
					<SelectItem value="This Week">This Week</SelectItem>
					<SelectItem value="This Month">This Month</SelectItem>
					<SelectItem value="Overdue">Overdue</SelectItem>
				</SelectContent>
			</Select>

			<Button
				variant={"outline"}
				className="h-fit py-2 w-full lg:w-fit"
				onClick={clearFilters}
			>
				Clear Filters
			</Button>
		</div>
	);
};

export default TaskFilters;
