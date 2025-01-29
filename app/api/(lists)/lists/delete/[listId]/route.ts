import { deleteList } from "@/db/lists";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { listId: string } }
) {
	const { listId } = await params;

	if (!listId) {
		return NextResponse.json({ message: "No listId sent" }, { status: 400 });
	}

	try {
		const deletedList = await deleteList(listId);

		if (deletedList) {
			return NextResponse.json(deletedList, { status: 200 });
		}
	} catch (error) {
		return NextResponse.json(
			{
				message: "Unknown error occurred when deleting list.",
				error,
			},
			{ status: 500 }
		);
	}
}
