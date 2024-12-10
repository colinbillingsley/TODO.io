import { db } from "@/lib/db";

export async function getUserLists(userId: string) {
	const userLists = await db.project.findMany({
		where: {
			userId,
		},
	});

	return userLists;
}

export async function getListByName(userId: string, name: string) {
	const existingList = await db.project.findFirst({
		where: {
			userId,
			name,
		},
	});

	return existingList;
}

export async function deleteList(listId: string) {
	const deletedList = await db.project.delete({
		where: { id: listId },
	});
	return deletedList;
}

export async function createList(
	name: string,
	description: string | null,
	userId: string
) {
	const newList = db.project.create({
		data: {
			name,
			description,
			userId,
		},
	});

	return newList;
}
