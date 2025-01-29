"use client";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { Task } from "@prisma/client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import EditTaskForm from "./EditTaskForm";

const EditTask = ({
	task,
	setListTasks,
}: {
	task: Task;
	setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button className="p-2 hover:bg-gray-100 transition-colors bg-transparent rounded-full">
					<Pencil size={20} />
				</button>
			</DialogTrigger>
			<DialogContent className="max-w-[600px] h-[98%] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Task</DialogTitle>
					<DialogDescription>
						Change any information and click Save Changes to save the edited
						information. Otherwise press cancel to discard any changes made.
					</DialogDescription>
				</DialogHeader>
				<EditTaskForm
					task={task}
					setIsOpen={setIsOpen}
					setListTasks={setListTasks}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditTask;
