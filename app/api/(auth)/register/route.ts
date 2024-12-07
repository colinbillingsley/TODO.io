import { NextRequest, NextResponse } from "next/server";
import { createNewUser, getUserByUsername } from "@/db/users";

export async function POST(req: NextRequest) {
	try {
		const { username, firstName, lastName, password } = await req.json();

		// make sure all fields are filled
		if (!username || !firstName || !lastName || !password) {
			return NextResponse.json(
				{ message: "All fields are required." },
				{ status: 400 }
			);
		}

		// search through db to see if there is a user with the same username
		const existingUser = await getUserByUsername({ username });

		// username already exists, make user change their username
		if (existingUser) {
			return NextResponse.json(
				{ message: "Username already exists. Please enter a new username." },
				{ status: 409 }
			);
		}

		// create new user
		const newUser = await createNewUser({
			username,
			firstName,
			lastName,
			password,
		});

		return NextResponse.json(
			{
				message: "User registered successfully",
				user: { id: newUser.id, username: newUser.username },
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error registering user:", error);
		return NextResponse.json(
			{ message: "An error occurred while registering the user." },
			{ status: 500 }
		);
	}
}
