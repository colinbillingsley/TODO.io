import { getTodaysTasks } from "@/db/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ userId: string }> }
) {
	const { userId } = await params;

	try {
		if (!userId) {
			return NextResponse.json({ message: "No userId found" }, { status: 400 });
		}

		const todaysTasks = await getTodaysTasks(userId);

		return NextResponse.json(todaysTasks, { status: 200 });
	} catch (error) {
		console.error("Error fetching todays tasks:", error);
		return NextResponse.json(
			{ error: "Failed to fetch todays tasks" },
			{ status: 500 }
		);
	}
}
