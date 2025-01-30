import { deleteUser } from "@/db/users";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ userId: string }> }
) {
	const { userId } = await params;

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	try {
		const deletedUser = await deleteUser(userId);
		return NextResponse.json(deletedUser, { status: 200 });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ error: "Failed to delete user" },
			{ status: 500 }
		);
	}
}
