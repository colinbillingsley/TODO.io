"use client";
import TaskOverview from "@/components/dashboard/TaskOverview";
import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import withAuth from "@/hoc/withAuth";

function Home() {
	return (
		<>
			<PageTitle>Dashboard</PageTitle>
			<div className="w-full h-full">
				<TaskOverview />
				{/* <DashboardCard
					title="Total Tasks"
					amount={123}
					className="rounded-sm"
				/>
				<DashboardCard title="Tasks Completed" amount={23} />
				<DashboardCard title="Tasks To Complete" amount={100} />
				<DashboardCard title="Upcoming Tasks" amount={100} />
				<DashboardCard title="Todays Tasks" amount={100} /> */}
			</div>
		</>
	);
}

export default withAuth(Home);
