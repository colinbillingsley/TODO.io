"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import withAuth from "@/hoc/withAuth";
import React from "react";

const UserProfile = () => {
	const { user } = useAuthContext();

	return (
		<>
			<PageTitle>{user?.username || "Unkown"}&apos;s Profile</PageTitle>
		</>
	);
};

export default withAuth(UserProfile);
