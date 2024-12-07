import { NextRequest, NextResponse } from "next/server";
import { getUserByUsername } from "@/db/users";

// API route handler for login
export async function POST(req: NextRequest) {
	try {
		const { username, password } = await req.json();

		// Check for missing username or password
		if (!username || !password) {
			return NextResponse.json(
				{ message: "Username and password are required." },
				{ status: 400 }
			);
		}

		const user = await getUserByUsername({ username });

		// Validate user existence and password
		if (!user || user.password !== password) {
			return NextResponse.json(
				{ message: "Invalid username or password." },
				{ status: 401 }
			);
		}

		// Return successful response
		return NextResponse.json({
			message: "Login successful!",
			user: {
				id: user.id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		});
	} catch (error) {
		console.error("Error in login route:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
