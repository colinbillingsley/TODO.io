import PageContainer from "@/components/PageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="flex min-h-screen w-full">
			{/* Fixed Sidebar */}
			<div className="flex-shrink-0 h-screen fixed z-999">
				<Sidebar />
			</div>

			{/* Content Area */}
			<div className="flex-1 ml-[6rem] sm:ml-[14rem]">
				<PageContainer>{children}</PageContainer>
			</div>
		</main>
	);
}
