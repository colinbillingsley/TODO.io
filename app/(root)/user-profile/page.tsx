"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import DeleteAccount from "@/components/profile/DeleteAccount";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import withAuth from "@/hoc/withAuth";
import React, { useState } from "react";

const UserProfile = () => {
	const { user, logoutUser } = useAuthContext();

	return (
		<>
			<PageTitle>{user?.username || "Unkown"}&apos;s Profile</PageTitle>

			<div className="flex flex-col gap-3 w-[400px] mt-4">
				<div className="flex flex-row justify-between items-center gap-2">
					<Label>Username</Label>
					<Input readOnly value={user?.username} className="w-[300px]" />
				</div>

				<div className="flex flex-row justify-between items-center gap-2">
					<Label>First Name</Label>
					<Input readOnly value={user?.firstName} className="w-[300px]" />
				</div>

				<div className="flex flex-row justify-between items-center gap-2">
					<Label>Last Name</Label>
					<Input readOnly value={user?.lastName} className="w-[300px]" />
				</div>
			</div>

			<div className="mt-5">
				<DeleteAccount user={user} logoutUser={logoutUser} />
			</div>
		</>
	);
};

export default withAuth(UserProfile);
