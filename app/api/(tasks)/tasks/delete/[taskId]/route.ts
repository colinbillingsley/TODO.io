import { deleteTask } from "@/db/tasks";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ taskId: string }> }
) {
	const { taskId } = await params;

	if (!taskId) {
		return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
	}

	try {
		const deletedTask = await deleteTask(taskId);
		return NextResponse.json(deletedTask, { status: 200 });
	} catch (error) {
		console.error("Error deleting task:", error);
		return NextResponse.json(
			{ error: "Failed to delete task" },
			{ status: 500 }
		);
	}
}
