import { db } from "@/lib/db";
import { User } from "@/types";

/**
 * Finds a user in the database from their username.
 *
 * @param {Object} params - The parameters for finding a user in the database.
 * @param {string} params.username - The unique username for the user.
 * @returns {Promise<(User & { password: string }) | null>} - A promise that resolves to the found user object.
 */
export async function getUserByUsername({
	username,
}: {
	username: string;
}): Promise<(User & { password: string }) | null> {
	// Find the user in the database
	const user = await db.user.findUnique({
		where: { username },
	});

	return user;
}

/**
 * Creates a new user in the database.
 *
 * @param {Object} params - The parameters for creating a new user.
 * @param {string} params.username - The unique username for the user.
 * @param {string} params.firstName - The first name of the user.
 * @param {string} params.lastName - The last name of the user.
 * @param {string} params.password - The password for the user account.
 * @returns {Promise<User>} - A promise that resolves to the newly created user object.
 */
export async function createNewUser({
	username,
	firstName,
	lastName,
	password,
}: {
	username: string;
	firstName: string;
	lastName: string;
	password: string;
}): Promise<User> {
	// create new user in db
	const newUser = await db.user.create({
		data: {
			username,
			firstName,
			lastName,
			password,
		},
	});

	return newUser;
}

export async function deleteUser(userId: string) {
	const userToDelete = await db.user.delete({
		where: {
			id: userId,
		},
	});

	return userToDelete;
}
