import { getListByName } from "@/db/lists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { listName: string; userId: string } }
) {
	try {
		const { userId, listName } = await params;

		if (!userId || !listName) {
			return NextResponse.json(
				{ message: "User ID or List Name not found in params." },
				{ status: 400 }
			);
		}

		// Call your database function to get the list by name
		const foundList = await getListByName(userId, listName);

		if (!foundList) {
			return NextResponse.json(
				{
					message: `List with name "${listName}" for user "${userId}" not found.`,
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(foundList, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Internal Server Error",
				error: "Unknown error occurred when retrieving list by list name.",
			},
			{ status: 500 }
		);
	}
}
