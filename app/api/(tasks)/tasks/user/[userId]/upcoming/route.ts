import { getUpcomingTasks } from "@/db/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const { userId } = await params;

	try {
		if (!userId) {
			return NextResponse.json({ message: "No userId found" }, { status: 400 });
		}

		const upcomingTasks = await getUpcomingTasks(userId);

		return NextResponse.json(upcomingTasks, { status: 200 });
	} catch (error) {
		console.error("Error fetching upcoming tasks:", error);
		return NextResponse.json(
			{ error: "Failed to fetch upcoming tasks" },
			{ status: 500 }
		);
	}
}
