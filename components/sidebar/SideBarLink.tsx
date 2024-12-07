"use client";
import Link from "next/link";
import { ReactElement } from "react";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
	title: string;
	path: string;
	icon: ReactElement;
}

const SidebarLink = ({ title, path, icon }: SidebarLinkProps) => {
	const pathname = usePathname();

	const isActive = pathname === path;

	return (
		<Link
			href={path}
			className={`flex items-center justify-center sm:justify-start gap-5 w-full p-3 rounded-md text-nowrap font-medium transition-colors
				${
					isActive
						? "bg-primary-foreground text-primary"
						: "hover:bg-primary-foreground/25 hover:text-primary-foreground active:bg-primary-foreground/50 active:text-primary-foreground"
				}
			`}
		>
			{icon}
			<span className="hidden sm:block">{title}</span>
		</Link>
	);
};

export default SidebarLink;
