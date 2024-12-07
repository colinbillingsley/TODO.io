import React, { ReactNode } from "react";

const PageTitle = ({ children }: { children: ReactNode }) => {
	return <h1 className="font-bold text-3xl mb-3">{children}</h1>;
};

export default PageTitle;
