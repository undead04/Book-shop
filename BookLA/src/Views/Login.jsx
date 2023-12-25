import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosClient from "./../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(null);
	const navigator = useNavigate();
	const { setToken, token, setUserId } = useStateContext();

	useEffect(() => {
		if (token) {
			navigator("/home");
		}
	}, []);
	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		axiosClient
			.post("/Account/SignIn", JSON.stringify(data), {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
				if (res.errorCode === 400) {
					setError(res.message);
				}
				if (res.message) {
				} else {
					setToken(res.data.token);
					console.log(res.data);
					setUserId(res.data.userID);
				}
			});
	};
	return (
		<div className="dark:bg-slate-700 p-8 flex-1">
			<h4 className="font-bold text-2xl uppercase text-center mb-2 dark:text-white">
				Login
			</h4>

			<Transition show={!!error} className={"fixed top-10 right-10"}>
				<Transition.Child
					enter="transition ease-in-out duration-300 transform"
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="relative shadow-md bg-yellow-400 p-6 text-white block text-end">
						<button
							className="absolute top-1 right-1"
							onClick={() => setError()}
						>
							<XMarkIcon className="w-6 h-6 text-white" />
						</button>
						<h5 className="text-white font-bold block text-start">
							Thông báo
						</h5>
						<span className="text-sm">{error}</span>
					</div>
				</Transition.Child>
			</Transition>
			<form onSubmit={onSubmit}>
				<Input title={"email"} ref={emailRef} />
				<Input
					title={"Password"}
					ref={passwordRef}
					error={"Invalid"}
					type={"password"}
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
				/>
			</form>
		</div>
	);
};

export default Login;
