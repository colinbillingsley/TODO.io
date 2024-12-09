"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddListForm from "./AddListForm";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "@/types";
import { ListWithNum } from "@/app/(root)/lists/page";

const AddList = ({
	variant,
	className,
	setLists,
	setFilteredLists,
}: {
	variant:
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "sidebar"
		| null
		| undefined;
	className?: string;
	setLists?: React.Dispatch<React.SetStateAction<List[]>>;
	setFilteredLists?: React.Dispatch<React.SetStateAction<ListWithNum[]>>;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant={variant}
					className={cn(`justify-center gap-2`, className)}
				>
					<span className="hidden sm:block">Add List</span>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create List</DialogTitle>
					<DialogDescription>
						Create a list to add to-do items.
					</DialogDescription>
				</DialogHeader>
				<>
					<AddListForm
						setIsOpen={setIsOpen}
						setLists={setLists}
						setFilteredLists={setFilteredLists}
					/>
				</>
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddList;
