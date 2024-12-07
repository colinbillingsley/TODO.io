"use client";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import React from "react";
import withAuth from "@/hoc/withAuth";

const Calendar = () => {
	return (
		<>
			<div>
				<PageTitle>Calendar</PageTitle>
			</div>
		</>
	);
};

export default withAuth(Calendar);
