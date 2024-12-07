import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { List } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import dayjs from "dayjs";

const ListCard = ({ list, numTasks }: { list: List; numTasks: number }) => {
	const truncateText = (text: string | null, maxLength: number) => {
		if (text) {
			return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
		}
		return "No description found.";
	};

	return (
		<Link
			href={`/lists/${list.name.split(" ").join("-")}?projectId=${list.id}`}
			className="group w-full h-fit min-w-[10rem] border-2 border-transparent hover:border-accent transition-all rounded-sm"
		>
			<Card
				className={cn(
					`relative p-2 h-36 shadow-md border-none flex-1 rounded-sm`
				)}
			>
				<span className="absolute top-[6px] right-[6px] size-8 text-center py-1 rounded-full bg-primary/15 text-primary">
					{numTasks}
				</span>
				<div className="h-full flex items-center">
					<CardHeader>
						<CardTitle>{truncateText(list.name, 16)}</CardTitle>
						<CardDescription className="flex flex-col gap-1">
							<span>{truncateText(list.description, 75)}</span>
							<span className="text-primary font-bold bg-primary/25 px-2 py-1 rounded-sm w-fit">
								{dayjs(list.createdAt).isValid()
									? dayjs(list.createdAt).format("MMMM D, YYYY")
									: "Invalid Date"}
							</span>
						</CardDescription>
					</CardHeader>
				</div>
			</Card>
		</Link>
	);
};

export default ListCard;
