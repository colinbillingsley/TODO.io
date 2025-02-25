import { NextResponse } from "next/server";
import { getAllUserTasks } from "@/db/tasks";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ userId: string }> }
) {
	const { userId } = await params;

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	try {
		const allUserTasks = await getAllUserTasks({ userId });
		return NextResponse.json(allUserTasks, { status: 200 });
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return NextResponse.json(
			{ message: "Failed to fetch tasks", error },
			{ status: 500 }
		);
	}
}
