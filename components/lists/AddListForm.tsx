"use client";
import { useCallback, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingSpinner from "../login/LoadingSpinner";
import { useAuthContext } from "@/app/context/AuthContext";
import { useListContext } from "@/app/context/ListContext";
import { List } from "@/types";
import { ListWithNum } from "@/app/(root)/lists/page";
import { toast } from "sonner";
import dayjs from "dayjs";

const listSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
});

type ListFormValues = z.infer<typeof listSchema>;

const AddListForm = ({
	setIsOpen,
	setLists,
	setListWithTaskCounts,
}: {
	setIsOpen: (state: boolean) => void;
	setLists?: React.Dispatch<React.SetStateAction<List[]>>;
	setListWithTaskCounts?: React.Dispatch<React.SetStateAction<ListWithNum[]>>;
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<String>("");
	const { user } = useAuthContext();
	const { addList } = useListContext();

	const defaultValues = useMemo(() => ({ name: "", description: "" }), []);

	const form = useForm<ListFormValues>({
		resolver: zodResolver(listSchema),
		defaultValues,
	});

	const onSubmit = useCallback(
		async (values: ListFormValues) => {
			setIsLoading(true);
			setErrorMessage("");

			try {
				const payload = { ...values, userId: user?.id };

				const res = await fetch("/api/lists", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});

				if (!res.ok) {
					const errorData = await res.json();
					setErrorMessage(errorData.message || "Error creating list.");
					return;
				}

				const data = await res.json();
				// add list to the list context
				setLists?.((prev) => (prev ? [...prev, data] : [data]));
				setListWithTaskCounts?.((prev) =>
					prev
						? [...prev, { list: data, numTasks: 0 }]
						: [{ list: data, numTasks: 0 }]
				);

				addList(data);

				toast("List has been created", {
					description: `${dayjs(data.createdAt)
						.format("dddd, MMMM DD, YYYY [at] h:mm A")
						.toString()}`,
				});
				setIsOpen(false);
				form.reset();
			} catch (error) {
				console.error("List creation error:", error);
				setErrorMessage("An unexpected error occurred.");
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		},
		[setIsOpen, setLists, setListWithTaskCounts, user, addList]
	);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Name..."
									{...field}
									className="h-12"
									onChange={(e) => {
										field.onChange(e);
										form.clearErrors("name"); // Clear error message on typing
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="description"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="Description..."
									{...field}
									className="h-12"
									onChange={(e) => {
										field.onChange(e);
										form.clearErrors("description"); // Clear error message on typing
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<span
					className={`${
						errorMessage !== "" ? "block" : "hidden"
					} text-red-500 bg-red-100/50 p-2 rounded-md`}
				>
					{errorMessage}
				</span>

				<Button
					type="submit"
					className="w-full text-white py-3 h-fit"
					disabled={isLoading}
				>
					{isLoading ? (
						<span className="flex items-center justify-center">
							<LoadingSpinner size={20} className="mr-2" />
							Creating list...
						</span>
					) : (
						"Create List"
					)}
				</Button>
			</form>
		</Form>
	);
};

export default AddListForm;
