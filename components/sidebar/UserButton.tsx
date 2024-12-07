"use client";
import React from "react";
import { Button } from "../ui/button";
import { CircleUserRound } from "lucide-react";
import { useAuthContext } from "@/app/context/AuthContext";

const UserButton = ({ size }: { size: number }) => {
	const { currentUser } = useAuthContext();
	const user = currentUser();

	return (
		<Button variant={"sidebar"}>
			<CircleUserRound size={size} />
			<span>{user?.username}</span>
		</Button>
	);
};

export default UserButton;
