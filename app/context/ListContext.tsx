"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { ListContextProps, List } from "@/types";

export const ListContext = createContext<ListContextProps | null>(null);

export const ListContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [lists, setLists] = useState<Array<List>>([]);

	const fetchLists = async (userId: string): Promise<List[]> => {
		let listArr: List[] = [];

		try {
			const res = await fetch(`/api/lists/user/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				const data = await res.json();
				setLists(data);
				listArr = [...data];
			}
		} catch (error) {
			console.error(error);
		} finally {
			return listArr || [];
		}
	};

	const addList = async (list: List) => {
		setLists((prevList) => [...prevList, list]);
	};

	const removeList = async (listId: string) => {
		const newList = lists.filter((list) => list.id !== listId);
		setLists(newList);
		return newList;
	};

	const editList = async (updatedList: List) => {
		const id = updatedList.id;
		setLists((prevLists) =>
			prevLists.map((list) =>
				list.id === id ? { ...list, ...updatedList } : list
			)
		);
	};

	return (
		<ListContext.Provider
			value={{ lists, addList, removeList, editList, fetchLists }}
		>
			{children}
		</ListContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useListContext = () => {
	const context = useContext(ListContext);
	if (!context) {
		throw new Error("useListContext must be used within an ListProvider");
	}
	return context;
};
