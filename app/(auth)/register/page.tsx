import RegisterForm from "@/components/register/RegisterForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

const Register = () => {
	return (
		<Card className="min-h-fit min-w-full sm:min-w-[75%]">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">
					Register an account with TODO.io
				</CardTitle>
				<CardDescription>
					Fill in all the fields to register your account with us.
				</CardDescription>
			</CardHeader>
			<CardContent className="h-full">
				<RegisterForm />
			</CardContent>
		</Card>
	);
};

export default Register;
