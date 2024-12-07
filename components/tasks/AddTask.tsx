"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import AddTaskForm from "./AddTaskForm";
import { Task } from "@prisma/client";

const AddTask = ({
	projectId,
	userId,
	setListTasks,
}: {
	projectId: string;
	userId: string;
	setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="py-2 h-fit w-full lg:w-fit">
					<span>Add Task</span>
					<Plus size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add a Task</DialogTitle>
					<DialogDescription>Add a task to do for the list.</DialogDescription>
				</DialogHeader>
				<>
					<AddTaskForm
						projectId={projectId}
						userId={userId}
						setListTasks={setListTasks}
						setIsOpen={setIsOpen}
					/>
				</>
			</DialogContent>
		</Dialog>
	);
};

export default AddTask;
