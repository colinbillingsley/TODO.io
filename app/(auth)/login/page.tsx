import LoginForm from "@/components/login/LoginForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

const Login = () => {
	return (
		<Card className="min-h-fit min-w-full sm:min-w-[75%]">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Welcome back to TODO.io</CardTitle>
				<CardDescription>
					Enter your username and password to login.
				</CardDescription>
			</CardHeader>
			<CardContent className="h-full">
				<LoginForm />
			</CardContent>
		</Card>
	);
};

export default Login;
