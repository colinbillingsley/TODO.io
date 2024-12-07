// hoc/withAuth.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
	const Wrapper = (props: any) => {
		const { user, getUserFromLocalStorage, setUser, logoutUser } =
			useAuthContext();
		const router = useRouter();

		useEffect(() => {
			// if no user in context, set the user from local storage, if none, logout and return to login
			if (!user) {
				const storedUser = getUserFromLocalStorage();
				if (!storedUser) {
					router.push("/login");
					logoutUser();
				} else {
					setUser(storedUser);
				}
			}
		}, [user, router]);

		if (!user) {
			return null; // Optionally, show a loading spinner
		}

		return <WrappedComponent {...props} />;
	};

	return Wrapper;
};

export default withAuth;
