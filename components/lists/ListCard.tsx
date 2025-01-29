import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { List } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import dayjs from "dayjs";
import DeleteList from "./DeleteList";
import { ListWithNum } from "@/app/(root)/lists/page";

const ListCard = ({
	list,
	numTasks,
	setLists,
	filteredLists,
	setListWithTaskCounts,
}: {
	list: List;
	numTasks: number;
	setLists: React.Dispatch<React.SetStateAction<List[]>>;
	filteredLists: ListWithNum[];
	setListWithTaskCounts: React.Dispatch<React.SetStateAction<ListWithNum[]>>;
}) => {
	const truncateText = (text: string | null, maxLength: number) => {
		if (text) {
			return text.length > maxLength
				? text.slice(0, maxLength).trim() + "..."
				: text;
		}
		return "No description found.";
	};

	const handleDeleteList = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
	};

	return (
		<Card
			className={cn(
				`group relative p-2 h-36 shadow-md border-2 border-transparent hover:border-accent transition-all flex-1 rounded-sm`
			)}
		>
			<div>
				<span className="absolute top-[6px] right-[48px] size-8 text-center py-1 rounded-full bg-primary/15 text-primary">
					{numTasks}
				</span>
				<DeleteList
					onClick={handleDeleteList}
					list={list}
					setLists={setLists}
					filteredLists={filteredLists}
					setListWithTaskCounts={setListWithTaskCounts}
				/>
			</div>

			<div className="h-full flex items-center">
				<CardHeader>
					<Link
						href={`/lists/${list.name.split(" ").join("-")}?projectId=${
							list.id
						}`}
						prefetch={false}
						className="hover:underline underline-offset-4 w-fit"
					>
						<CardTitle>{truncateText(list.name, 16)}</CardTitle>
					</Link>
					<CardDescription className="flex flex-col gap-1">
						<span>{truncateText(list.description, 65)}</span>
						<span className="text-primary font-bold bg-primary/25 px-2 py-1 rounded-sm w-fit">
							{dayjs(list.createdAt).isValid()
								? dayjs(list.createdAt).format("MMMM D, YYYY")
								: "Invalid Date"}
						</span>
					</CardDescription>
				</CardHeader>
			</div>
		</Card>
	);
};

export default ListCard;
