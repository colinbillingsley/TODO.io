"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingSpinner from "../login/LoadingSpinner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

const registerSchema = z.object({
	username: z.string().min(1, { message: "Username is required" }),
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { loginUser } = useAuthContext();

	const router = useRouter();

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			password: "",
		},
	});

	const onSubmit = async (values: RegisterFormValues) => {
		setIsLoading(true);
		setErrorMessage("");

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!res.ok) {
				const errorData = await res.json();
				setErrorMessage(errorData.message || "Registration failed.");
				return;
			}

			const data = await res.json();
			loginUser(data.user); // set user in auth context
			router.push("/");
		} catch (error) {
			console.error("Register error:", error);
			setErrorMessage("An unexpected error occurred.");
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 sm:space-y-8"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="username"
									{...field}
									className="h-12"
									onChange={(e) => {
										field.onChange(e);
										setErrorMessage(""); // Clear error message on typing
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 w-full">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className="flex-1 w-full">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your first name"
										{...field}
										className="h-12"
										onChange={(e) => {
											field.onChange(e);
											setErrorMessage(""); // Clear error message on typing
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem className="flex-1 w-full">
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your last name"
										{...field}
										className="h-12"
										onChange={(e) => {
											field.onChange(e);
											setErrorMessage(""); // Clear error message on typing
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="password"
									{...field}
									className="h-12"
									onChange={(e) => {
										field.onChange(e);
										setErrorMessage(""); // Clear error message on typing
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<span
					className={`${
						errorMessage !== "" ? "block" : "hidden"
					} text-red-500 bg-red-100/50 p-2 rounded-md`}
				>
					{errorMessage}
				</span>

				<Button type="submit" className="w-full text-white py-3 h-fit">
					{isLoading ? (
						<span className="flex items-center justify-center">
							<LoadingSpinner size={20} className="mr-2" />
							Registering...
						</span>
					) : (
						"Register"
					)}
				</Button>

				<div className="flex gap-2 items-center justify-end">
					<span className="">Already have an account? </span>

					<Link href={"/login"} className="group" prefetch={false}>
						<Button variant={"outline"} className="h-fit px-4 py-2">
							<span>Login</span>
							<ArrowRight className="group-hover:translate-x-1 transition-transform" />
						</Button>
					</Link>
				</div>
			</form>
		</Form>
	);
};

export default RegisterForm;
