import { NextResponse } from "next/server";
import { getProjectTasks } from "@/db/tasks";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ projectId: string }> }
) {
	const { projectId } = await params;

	if (!projectId) {
		return NextResponse.json(
			{ error: "Project ID is required" },
			{ status: 400 }
		);
	}

	try {
		const projectTasks = await getProjectTasks(projectId);
		return NextResponse.json(projectTasks, { status: 200 });
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return NextResponse.json(
			{ error: "Failed to fetch tasks" },
			{ status: 500 }
		);
	}
}
