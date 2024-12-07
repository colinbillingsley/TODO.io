import { cn } from "@/lib/utils";
import React from "react";

const LoadingSpinner = ({ size = 24, className = "" }) => {
	return (
		<div
			className={cn(
				`animate-spin rounded-full border-t-2 border-l-2 border-white/90`,
				className
			)}
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	);
};

export default LoadingSpinner;
