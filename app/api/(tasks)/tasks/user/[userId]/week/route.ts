import { getUsersWeekTasks } from "@/db/tasks";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await params;

		const weeksTasks = await getUsersWeekTasks(userId);

		return NextResponse.json(weeksTasks, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch this weeks tasks", error },
			{ status: 500 }
		);
	}
}
