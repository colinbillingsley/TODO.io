"use client";
import {
	CircleCheckBig,
	CircleUserRound,
	Clock,
	FolderKanban,
	LayoutDashboard,
	LogOut,
} from "lucide-react";
import { ReactElement } from "react";
import SidebarLink from "./SideBarLink";
import { Button } from "../ui/button";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
const SIDEBARICONSIZE = 18;

interface sideBarProps {
	title: string;
	path: string;
	icon: ReactElement;
}

const sidebarItems: sideBarProps[] = [
	{
		title: "Dashboard",
		path: "/",
		icon: <LayoutDashboard size={SIDEBARICONSIZE} />,
	},
	{
		title: "Today's Tasks",
		path: "/todays-tasks",
		icon: <CircleCheckBig size={SIDEBARICONSIZE} />,
	},
	{
		title: "Weekly Tasks",
		path: "/weekly-tasks",
		icon: <Clock size={SIDEBARICONSIZE} />,
	},
	{
		title: "Lists",
		path: "/lists",
		icon: <FolderKanban size={SIDEBARICONSIZE} />,
	},
];

const Sidebar = () => {
	const { logoutUser, user } = useAuthContext();
	const router = useRouter();

	const handleLogout = async () => {
		router.replace("/login");
		logoutUser();
	};

	return (
		<div className="flex flex-col h-full w-20 sm:w-56 p-4 bg-primary text-primary-foreground">
			<>
				<span className="text-center mb-5 font-bold text-xs sm:text-lg uppercase">
					Todo.io
				</span>
			</>

			<>
				<SidebarLink
					title={user?.username || "Unknown"}
					icon={<CircleUserRound size={SIDEBARICONSIZE} />}
					path={"/user-profile"}
				/>
			</>
			<nav className="flex flex-col items-start justify-start">
				<>
					{sidebarItems.map((item) => (
						<div key={item.title} className="w-full">
							<SidebarLink
								title={item.title}
								icon={item.icon}
								path={item.path}
							/>
						</div>
					))}
				</>
			</nav>
			<div className="flex flex-col items-center justify-center mt-auto">
				<Button variant={"sidebar"} onClick={handleLogout}>
					<LogOut size={SIDEBARICONSIZE} />
					<span className="hidden sm:block">Logout</span>
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
