import React, { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosClient from "./../axios-client";

const Login = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const handleSubmit = (e) => {
		e.preventDefault();
		const frmData = new FormData();
		frmData.append("username", usernameRef.current.value);
		frmData.append("password", passwordRef.current.value);
		axiosClient.post("/login", frmData);
	};
	return (
		<div className="dark:bg-slate-700 p-8 flex-1">
			<h4 className="font-bold text-2xl uppercase text-center mb-2 dark:text-white">
				Login
			</h4>
			<form action="">
				<Input title={"UserName"} ref={usernameRef} />
				<Input
					title={"Password"}
					ref={passwordRef}
					error={"Invalid"}
				/>

				<span className="text-white block mt-4 text-center">
					Don't have an account?{" "}
					<Button
						classNames={
							"underline text-indigo-200 hover:text-indigo-400"
						}
						text={"Sign up"}
						to="/signup"
					/>
				</span>
				<Button
					classNames={
						"bg-indigo-500 text-white text-center block mx-auto px-5 py-2 mt-4"
					}
					text={"Login"}
					onClick={handleSubmit}
				/>
			</form>
		</div>
	);
};

export default Login;
