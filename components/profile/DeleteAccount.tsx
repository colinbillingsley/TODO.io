import { useState } from "react";
import LoadingSpinner from "../login/LoadingSpinner";
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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { User } from "@/types";

const DeleteAccount = ({
	user,
	logoutUser,
}: {
	user: User;
	logoutUser: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const deleteUser = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (user) {
			setIsLoading(true);
			try {
				const res = await fetch(`/api/user/${user.id}/delete`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res.ok) {
					const data = await res.json();
					return data;
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleDeleteUser = async (e: React.MouseEvent) => {
		const userDeleted = await deleteUser(e);
		setIsOpen(false); // Close the dialog manually only after operations
		if (userDeleted) {
			await new Promise((resolve) => setTimeout(resolve, 1500)); // Optional delay
			router.push("/login");
			logoutUser();
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant={"outline"}
					className="border-red-500 text-red-500 hover:bg-red-50"
				>
					Delete Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure you want to delete your account?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setIsOpen(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						asChild
						className="text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer"
						onClick={handleDeleteUser}
						disabled={isLoading}
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
								<LoadingSpinner size={20} className="mr-2" />
								Deleting Account...
							</span>
						) : (
							<p>Delete</p>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteAccount;
