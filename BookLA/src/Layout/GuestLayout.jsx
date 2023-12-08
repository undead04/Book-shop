import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const GuestLayout = () => {
	const { token } = useStateContext();
	console.log(token);
	if (token) {
		return <Navigate to={"/"} />;
	}
	return (
		<div className="flex flex-wrap min-h-screen items-center justify-center w-full content-center py-10 bg-gray-200">
			<div className="flex shadow-sm gap-2">
				<div className="flex flex-wrap content-center justify-center rounded-r-md">
					<img
						className="w-[50%] h-auto bg-center bg-no-repeat bg-cover rounded-r-md"
						src="https://i.imgur.com/9l1A4OS.jpeg"
					/>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default GuestLayout;
