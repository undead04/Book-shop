import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "./Component/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import Footer from "./Component/Footer.jsx";

const DefaultLayout = () => {
	const { userId, setUser } = useStateContext();

	useEffect(() => {
		try {
			if (userId) {
				axiosClient.get(`/user/${userId}`).then((res) => {
					console.log(res.data);
					setUser(res.data);
				});
			}
		} catch (error) {}
	}, []);
	return (
		<div className="container mx-auto bg-gray-200 text-gray-700 dark:bg-gray-950 dark:text-gray-200">
			<Navbar />
			<div className="grid lg:grid-cols-5 grid-cols-3 mt-4 gap-8">
				<div className="lg:col-span-1 col-span-1 min-h-screen ">
					<Sidebar />
				</div>
				<div className="lg:col-span-4 col-span-2">
					<Outlet />
				</div>
				<div></div>
			</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
