import { db } from "@/lib/db";
import { Task } from "@/types";
import { Priority } from "@prisma/client";

/**
 * Retrieves all tasks created by a specific user.
 *
 * @param {Object} params - The parameters for retrieving tasks.
 * @param {string} params.userId - The ID of the user whose tasks are being retrieved.
 * @returns {Promise<Array<Task> | null>} - A promise that resolves to an array of tasks created by the user.
 */
export async function getAllUserTasks({
	userId,
}: {
	userId: string;
}): Promise<Array<Task> | null> {
	const allUserTasks = await db.task.findMany({
		where: { userId },
		select: {
			id: true,
			title: true,
			description: true,
			completed: true,
			dueDate: true,
			priority: true,
		},
	});

	return allUserTasks;
}

export async function getProjectTasks(projectId: string) {
	const projectTasks = await db.task.findMany({
		where: { projectId },
	});

	return projectTasks;
}

export async function countTasksInList(projectId: string) {
	const numTasks = await db.task.count({
		where: { projectId },
	});

	return numTasks;
}

/**
 * Retrieves all tasks that are due today
 *
 * @param {Object} params - The parameters for retrieving tasks.
 * @param {string} params.userId - The ID of the user whose tasks are being retrieved.
 * @returns {Promise<Array<Task> | null>} - A promise that resolves to an array of tasks created by the user.
 */
export async function getTodaysTasks({
	userId,
}: {
	userId: string;
}): Promise<Array<Task> | null> {
	const todaysDate = new Date();
	const todaysTasks = db.task.findMany({
		where: { userId, dueDate: todaysDate },
		select: {
			id: true,
			title: true,
			description: true,
			completed: true,
			dueDate: true,
			priority: true,
		},
	});

	return todaysTasks;
}

export async function createTask(
	title: string,
	description: string,
	completed: boolean,
	dueDate: Date,
	priority: Priority,
	userId: string
) {
	const newTask = db.task.create({
		data: {
			title,
			description,
			completed,
			dueDate,
			priority,
			userId,
		},
	});

	return newTask;
}
