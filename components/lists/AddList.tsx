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

const AddList = ({
	variant,
	className,
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
					<AddListForm setIsOpen={setIsOpen} />
				</>
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddList;
