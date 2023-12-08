import React, { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Signup = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const emaildRef = useRef();
	const passwordConfirmRef = useRef();
	return (
		<div className="dark:bg-slate-700 p-8 flex-1">
			<h4 className="font-bold text-2xl uppercase text-center mb-2 dark:text-white">
				Sign up
			</h4>
			<form action="">
				<Input title={"UserName"} ref={usernameRef} />
				<Input title={"Email"} ref={emaildRef} error={""} />
				<Input title={"Password"} ref={passwordRef} error={""} />
				<Input
					title={"Password Confirmation"}
					ref={passwordConfirmRef}
					error={""}
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
