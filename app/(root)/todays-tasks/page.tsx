"use client";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import withAuth from "@/hoc/withAuth";
import React from "react";

const TodaysTasks = () => {
	return (
		<>
			<PageTitle>Today&apos;s Tasks</PageTitle>
		</>
	);
};

export default withAuth(TodaysTasks);
