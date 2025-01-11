import { updateTask } from "@/db/tasks";
import { Task } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
	req: NextRequest,
	{ params }: { params: { taskId: string } }
) {
	try {
		const { taskId } = await params;
		const editedTask = await req.json();

		console.log(editedTask);

		if (!taskId) {
			NextResponse.json(
				{ error: "Task ID was not passed in url" },
				{ status: 400 }
			);
		}

		if (!editedTask) {
			return NextResponse.json(
				{ error: "Edited task data was not provided" },
				{ status: 400 }
			);
		}

		const updatedTask: Task = await updateTask(taskId, editedTask);

		return NextResponse.json(updatedTask, { status: 200 });
	} catch (error) {
		console.error("Error updating task:", error);
		return NextResponse.json(
			{ error: "Failed to update task" },
			{ status: 500 }
		);
	}
}
