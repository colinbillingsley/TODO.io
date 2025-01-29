import { NextResponse } from "next/server";
import { getUserLists } from "@/db/lists";

export async function GET(
	req: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = await params;

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	try {
		const allUserLists = await getUserLists(userId);
		return NextResponse.json(allUserLists, { status: 200 });
	} catch (error) {
		console.error("Error fetching lists:", error);
		return NextResponse.json(
			{ message: "Failed to fetch lists.", error },
			{ status: 500 }
		);
	}
}
