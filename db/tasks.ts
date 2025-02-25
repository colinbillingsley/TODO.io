import { db } from "@/lib/db";
import { Task } from "@/types";
import { Priority } from "@prisma/client";
import dayjs from "dayjs";

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

export async function getUsersWeekTasks(userId: string) {
	const startOfWeek = dayjs().startOf("week").toISOString(); // Sunday at 00:00
	const endOfWeek = dayjs().endOf("week").toISOString(); // Saturday at 23:59

	const tasks = await db.task.findMany({
		where: {
			userId,
			dueDate: {
				gte: startOfWeek,
				lte: endOfWeek,
			},
		},
		orderBy: {
			dueDate: "asc",
		},
	});

	return tasks;
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

export async function deleteTask(taskId: string) {
	const deletedTask = db.task.delete({
		where: {
			id: taskId,
		},
	});

	return deletedTask;
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

/**
 * Retrieves all tasks that are due within the current week (including today).
 *
 * @param {string} userId - The userId for retrieving tasks made by the user.
 * @returns {Promise<Array<Task> | null>} - A promise that resolves to an array of tasks created by the user.
 */
export async function getUpcomingTasks(
	userId: string
): Promise<Array<Task> | null> {
	const todaysDate = new Date();

	const startOfWeek = new Date(
		todaysDate.getFullYear(),
		todaysDate.getMonth(),
		todaysDate.getDate(),
		0,
		0,
		0,
		0
	);

	const endOfWeek = new Date(
		todaysDate.getFullYear(),
		todaysDate.getMonth(),
		todaysDate.getDate() + 6, // 6 days from today (end of the week)
		23,
		59,
		59,
		999
	);

	const weeklyTasks = await db.task.findMany({
		where: {
			userId,
			dueDate: {
				gte: startOfWeek, // Greater than or equal to start of the week
				lte: endOfWeek, // Less than or equal to end of the week
			},
		},
	});

	return weeklyTasks;
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
