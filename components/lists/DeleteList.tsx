import React, { useState } from "react";
import {
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { List } from "@/types";
import LoadingSpinner from "../login/LoadingSpinner";
import { useListContext } from "@/app/context/ListContext";
import { toast } from "sonner";
import { ListWithNum } from "@/app/(root)/lists/page";

const DeleteList = ({
	onClick,
	list,
	setLists,
	filteredLists,
	setFilteredLists,
}: {
	onClick: (p: any) => void;
	list: List;
	setLists: React.Dispatch<React.SetStateAction<List[]>>;
	filteredLists: ListWithNum[];
	setFilteredLists: React.Dispatch<React.SetStateAction<ListWithNum[]>>;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const { lists, removeList } = useListContext();
	const [isOpen, setIsOpen] = useState(false);

	const updateLists = async (updatedList: List[]) => {
		setLists(updatedList);
		setFilteredLists(filteredLists.filter((item) => item.list.id !== list.id));
	};

	const handleDeleteList = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/lists/delete/${list.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const updatedList = await removeList(list.id);
				console.log("list after removal", updatedList);
				await updateLists(updatedList);
				toast(`${list.name} has been deleted`);
				setIsOpen(false);
			}
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<button
					onClick={onClick}
					className="absolute top-[6px] right-[12px] size-8 flex items-center justify-center py-1 rounded-full bg-transparent hover:bg-primary/15 text-primary"
				>
					<Trash2 size={20} />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete {list.name}?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the list.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setIsOpen(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 hover:bg-red-600"
						onClick={handleDeleteList}
					>
						{isLoading ? (
							<span className="flex items-center gap-3">
								<LoadingSpinner size={12} /> <span>Deleting...</span>
							</span>
						) : (
							"Delete"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteList;
