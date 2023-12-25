import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";

const UserLayout = () => {
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
			<div className="mt-8 px-3 min-h-screen">
				<Outlet />
			</div>
		</div>
	);
};

export default UserLayout;
