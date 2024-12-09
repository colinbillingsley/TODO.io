import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ListFilters = ({
	dateFilter,
	setDateFilter,
	clearFilters,
}: {
	dateFilter: string | undefined;
	setDateFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
	clearFilters: () => void;
}) => {
	return (
		<div className="w-full flex items-center gap-3">
			<Select
				key={dateFilter || "dateFilter-default"}
				value={dateFilter || undefined}
				onValueChange={(value) => setDateFilter(value)}
			>
				<SelectTrigger className="w-full max-w-48 bg-white">
					<SelectValue placeholder="Filter by Created Date" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="ascending">Ascending</SelectItem>
					<SelectItem value="descending">Descending</SelectItem>
				</SelectContent>
			</Select>

			<Button variant={"outline"} className="h-fit py-2" onClick={clearFilters}>
				Clear Filters
			</Button>
		</div>
	);
};

export default ListFilters;
