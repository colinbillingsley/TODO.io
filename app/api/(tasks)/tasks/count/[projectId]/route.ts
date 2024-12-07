import { countTasksInList } from "@/db/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { projectId: string } }
) {
	const { projectId } = await params;

	if (!projectId) {
		return NextResponse.json(
			{ error: "Project ID is required" },
			{ status: 400 }
		);
	}

	try {
		const numTasks = await countTasksInList(projectId);
		return NextResponse.json(numTasks, { status: 200 });
	} catch (error) {
		console.error("Error fetching number of tasks:", error);
		return NextResponse.json(
			{ error: "Failed to fetch number of tasks" },
			{ status: 500 }
		);
	}
}
