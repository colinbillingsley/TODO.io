"use client";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import withAuth from "@/hoc/withAuth";

const UpcomingTasks = () => {
	return (
		<>
			<PageTitle>Upcoming Tasks</PageTitle>
		</>
	);
};

export default withAuth(UpcomingTasks);
