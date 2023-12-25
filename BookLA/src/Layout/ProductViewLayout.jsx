import React, { useEffect } from "react";
import Navbar from "./Component/Navbar";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";

const ProductViewLayout = () => {
	const { userId, setUser } = useStateContext();

	useEffect(() => {
		try {
			if (userId) {
				axiosClient.get(`/user/${userId}`).then((res) => {
					setUser(res.data);
				});
			}
		} catch (error) {}
	}, []);
	return (
		<div className="container mx-auto">
			<Navbar />
			<div className="mt-4 min-h-screen">
				<Outlet />
			</div>
		</div>
	);
};

export default ProductViewLayout;
