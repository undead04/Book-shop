import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosClient from "../axios-client";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const Signup = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const emaildRef = useRef();
	const passwordConfirmRef = useRef();
	const navigator = useNavigate();
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		userName: "",
		email: "",
		password: "",
		comformPassword: "",
	});

	const { setToken, setUser, setUserId } = useStateContext();
	useEffect(() => {}, [errors]);

	const validateForm = () => {
		const newErrors = {};

		// Check if any field is empty
		for (const key in formData) {
			if (!formData[key]) {
				newErrors[key] = "This field is required";
			}
		}

		// Password validation
		// const passwordRegex =
		// 	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (formData.password.length < 8) {
			newErrors.password =
				"Password must be at least 8 characters long";
		} else {
			// Step 2: Check if the password has alpha characters

			// Step 3: Check if the password has numeric characters
			if (!/\d/.test(formData.password)) {
				newErrors.password =
					"Password must contain at least one numeric character";
			}

			// Step 4: Check if the password has special characters
			if (
				!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.password)
			) {
				console.log(formData.password);
				newErrors.password =
					"Password must contain at least one special character";
			}

			// Step 5: Check if the password has uppercase characters
			if (!/[A-Z]/.test(formData.password)) {
				newErrors.password =
					"Password must contain at least one uppercase character";
			}

			if (!/[a-z]/.test(formData.password)) {
				newErrors.password =
					"Password must contain at least one lowercase character";

				console.log(formData.password);
			}
		}

		// Confirm password validation
		if (formData.password !== formData.comformPassword) {
			newErrors.comformPassword = "Passwords do not match";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleApiError = (apiErrors) => {
		const newErrors = {};
		if (apiErrors.UserName) {
			newErrors.userName = apiErrors.UserName;
		}
		if (apiErrors.Email) {
			newErrors.email = apiErrors.Email;
		}

		setErrors(newErrors);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Submit the form data or perform any desired action
			axiosClient
				.post("/Account/SignUp", JSON.stringify(formData), {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					if (res && res.errorCode === 400) {
						handleApiError(res.message);
						console.log("API validation failed");
						return;
					}
					axiosClient
						.post(
							"/Account/SignIn",
							JSON.stringify({
								email: formData.email,
								password: formData.password,
							}),
							{
								headers: {
									"Content-Type": "application/json",
								},
							},
						)
						.then((res) => {
							if (res.errorCode === 0) {
								setUser({
									role: res.data.role.join(""),
									userId: res.data.userID,
									userName: res.data.userName,
								});
								console.log(res.data.userID);
								setUserId(res.data.userID);
								setToken(res.data.token);
							}
						});

					setFormData({
						userName: "",
						email: "",
						password: "",
						comformPassword: "",
					});

					if (res) {
						// navigator("/login");
					}
				});
		} else {
			console.log("Form validation failed");
		}
	};
	return (
		<div className="dark:bg-slate-700 p-8 flex-1">
			<h4 className="font-bold text-2xl uppercase text-center mb-2 dark:text-white">
				Sign up
			</h4>
			<form onSubmit={onSubmit}>
				<Input
					title={"UserName"}
					name={"userName"}
					value={formData.userName}
					onchange={handleChange}
					error={errors.userName && errors.userName}
				/>

				<Input
					title={"Email"}
					name={"email"}
					type={"email "}
					value={formData.email}
					onchange={handleChange}
					error={errors.email && errors.email}
				/>

				<Input
					title={"Password"}
					name={"password"}
					type={"password"}
					value={formData.password}
					onchange={handleChange}
					error={errors.password && errors.password}
				/>

				<Input
					title={"Password Confirmation"}
					name={"comformPassword"}
					type={"password"}
					value={formData.comformPassword}
					onchange={handleChange}
					error={errors.comformPassword && errors.comformPassword}
				/>

				<span className="text-white block mt-4 text-center">
					Already have an account?{" "}
					<Button
						classNames={
							"underline text-indigo-200 hover:text-indigo-400"
						}
						text={"Signin"}
						to="/login"
					/>
				</span>
				<Button
					classNames={
						"bg-indigo-500 text-white text-center block mx-auto px-5 py-2 mt-4"
					}
					text={"Register"}
				/>
			</form>
		</div>
	);
};

export default Signup;
