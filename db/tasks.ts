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

export async function updateTask(taskId: string, updatedTask: Task) {
	const taskBeingUpdated = db.task.update({
		where: {
			id: taskId,
		},
		data: {
			title: updatedTask.title,
			description: updatedTask.description,
			dueDate: new Date(updatedTask.dueDate),
			priority: updatedTask.priority,
			completed: updatedTask.completed,
		},
	});

	return taskBeingUpdated;
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
 * @param {string} userId - The userId for retrieving tasks made by user.
 * @returns {Promise<Array<Task> | null>} - A promise that resolves to an array of tasks created by the user.
 */
export async function getTodaysTasks(
	userId: string
): Promise<Array<Task> | null> {
	const todaysDate = new Date();

	const startOfDay = new Date(
		todaysDate.getFullYear(),
		todaysDate.getMonth(),
		todaysDate.getDate(),
		0,
		0,
		0,
		0
	);

	const endOfDay = new Date(
		todaysDate.getFullYear(),
		todaysDate.getMonth(),
		todaysDate.getDate(),
		23,
		59,
		59,
		999
	);

	console.log("Dates:", startOfDay, endOfDay);
	const todaysTasks = await db.task.findMany({
		where: {
			userId,
			dueDate: {
				gte: startOfDay, // Greater than or equal to start of the day
				lte: endOfDay, // Less than or equal to end of the day
			},
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
	const newTask = await db.task.create({
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

export async function countUserTasks(userId: string) {
	const numTasks = await db.task.count({
		where: {
			userId,
		},
	});
	return numTasks;
}

export async function countUserTasksCompleted(userId: string) {
	const numTasks = await db.task.count({
		where: {
			userId,
			completed: true,
		},
	});
	return numTasks;
}

export async function countUserTasksTodo(userId: string) {
	const numTasks = await db.task.count({
		where: {
			userId,
			completed: false,
		},
	});
	return numTasks;
}
