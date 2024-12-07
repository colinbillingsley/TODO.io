import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getListByName } from "@/db/lists";

export async function POST(req: NextRequest) {
	try {
		const { name, description, userId } = await req.json();

		if (!name || !description || !userId) {
			return NextResponse.json(
				{ message: "All fields are required." },
				{ status: 400 }
			);
		}

		const existingList = await getListByName(userId, name);

		if (existingList) {
			return NextResponse.json(
				{ message: "A list with this title already exists." },
				{ status: 401 }
			);
		}

		const newList = await db.project.create({
			data: {
				userId,
				name,
				description,
			},
		});

		return NextResponse.json(newList, { status: 200 });
	} catch (error) {
		console.error("Error creating new list:", error);
		return NextResponse.json(
			{ message: "An error occurred while creating new list." },
			{ status: 500 }
		);
	}
}
