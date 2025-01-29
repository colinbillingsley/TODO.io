import { getUsersWeekTasks } from "@/db/tasks";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { userId: string } }
) {
	try {
		const { userId } = await params;

		const weeksTasks = await getUsersWeekTasks(userId);

		return NextResponse.json(weeksTasks, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch this weeks tasks" },
			{ status: 500 }
		);
	}
}
