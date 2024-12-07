"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthContextProps, User } from "@/types";

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	// Automatically load the user from localStorage when the app starts
	useEffect(() => {
		const storedUser = getUserFromLocalStorage(); // Retrieve stored user data
		if (storedUser) {
			setUser(storedUser); // Set user if exists
		}
	}, []);

	// set user data in localStorage
	const setUserInLocalStorage = (user: User) => {
		try {
			localStorage.setItem("user", JSON.stringify(user)); // Store the user data as a string
		} catch (error) {
			console.error("Error setting user data in localStorage:", error);
		}
	};

	// retrieve user data from localStorage
	const getUserFromLocalStorage = (): User | null => {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	};

	// return the user logged in
	const currentUser = () => {
		return user;
	};

	const logoutUser = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	const loginUser = (user: User | null) => {
		setUser(user);

		if (user) setUserInLocalStorage(user);
		else logoutUser();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				currentUser,
				logoutUser,
				loginUser,
				getUserFromLocalStorage,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
