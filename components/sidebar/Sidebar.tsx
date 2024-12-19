"use client";
import {
	CalendarDays,
	CircleCheckBig,
	CircleUserRound,
	Clock,
	FolderKanban,
	LayoutDashboard,
	LogOut,
	Settings,
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
	hasSubMenu: boolean;
	subMenu?: Array<sideBarProps>;
	isLink: boolean;
}

const sidebarItems: sideBarProps[] = [
	{
		title: "Dashboard",
		path: "/",
		icon: <LayoutDashboard size={SIDEBARICONSIZE} />,
		hasSubMenu: false,
		isLink: true,
	},
	{
		title: "Today's Tasks",
		path: "/todays-tasks",
		icon: <CircleCheckBig size={SIDEBARICONSIZE} />,
		hasSubMenu: false,
		isLink: true,
	},
	{
		title: "Upcoming Tasks",
		path: "/upcoming-tasks",
		icon: <Clock size={SIDEBARICONSIZE} />,
		hasSubMenu: false,
		isLink: true,
	},
	// {
	// 	title: "Calendar",
	// 	path: "/calendar",
	// 	icon: <CalendarDays size={SIDEBARICONSIZE} />,
	// 	hasSubMenu: false,
	// 	isLink: true,
	// },
	{
		title: "Lists",
		path: "/lists",
		icon: <FolderKanban size={SIDEBARICONSIZE} />,
		hasSubMenu: true,
		subMenu: [],
		isLink: true,
	},
];

const Sidebar = () => {
	const { logoutUser, user } = useAuthContext();
	const router = useRouter();

	const handleLogout = async () => {
		logoutUser();
	};

	const subMenuGreaterThanOne = (menu: sideBarProps | undefined): boolean => {
		if (menu?.subMenu) {
			if (menu.subMenu.length > 0) return true;
			return false;
		}
		return false;
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
							{item.hasSubMenu
								? subMenuGreaterThanOne(item.subMenu)
									? item.subMenu?.map((sub) => (
											<div key={sub.title}>
												<SidebarLink
													title={sub.title}
													icon={sub.icon}
													path={sub.path}
												/>
											</div>
									  ))
									: ""
								: ""}
						</div>
					))}
				</>
			</nav>
			<div className="flex flex-col items-center justify-center mt-auto">
				<Button variant={"sidebar"}>
					<Settings size={SIDEBARICONSIZE} />
					<span className="hidden sm:block">Settings</span>
				</Button>
				<Button variant={"sidebar"} onClick={handleLogout}>
					<LogOut size={SIDEBARICONSIZE} />
					<span className="hidden sm:block">Logout</span>
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
