import { Priority } from "@prisma/client";

export interface User {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

export interface Task {
	id: string;
	title: string;
	description?: string | null;
	completed: boolean;
	dueDate: Date;
	priority: Priority;
}

export interface List {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuthContextProps {
	user: User | null;
	currentUser: () => User | null;
	setUser: (user: User | null) => void;
	loginUser: (user: User | null) => void;
	logoutUser: () => void;
	getUserFromLocalStorage: () => User | null;
}

export interface ListContextProps {
	lists: List[] | null;
	addList: (list: List) => void;
	removeList: (listId: string) => void;
	editList: (list: List) => void;
	fetchLists: (userId: string) => Promise<List[]>;
}
