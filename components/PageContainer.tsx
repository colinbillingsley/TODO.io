import React, { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex-1 h-full m-4 sm:m-8 font-[family-name:var(--font-geist-sans)] overflow-y-auto">
			{children}
		</div>
	);
};

export default PageContainer;
