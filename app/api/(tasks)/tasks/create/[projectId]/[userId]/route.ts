import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
	req: NextRequest,
	{ params }: { params: { projectId: string; userId: string } }
) {
	try {
		const { projectId, userId } = await params;
		const { title, description, dueDate, priority } = await req.json();

		if (!projectId || !userId) {
			return NextResponse.json(
				{ error: "Project ID and User ID is required." },
				{ status: 400 }
			);
		}

		if (!title || !description || !dueDate || !priority) {
			return NextResponse.json(
				{ error: "All fields are required for task." },
				{ status: 401 }
			);
		}

		const addedTask = await db.task.create({
			data: {
				title,
				description,
				dueDate,
				priority,
				projectId,
				userId,
			},
		});

		if (addedTask) {
			return NextResponse.json(addedTask, { status: 200 });
		}
	} catch (error) {}
}
