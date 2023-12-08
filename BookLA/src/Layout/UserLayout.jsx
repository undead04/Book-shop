import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
	return (
		<div className="container mx-auto">
			<Navbar />
			<div className="mt-8 px-3">
				<Outlet />
			</div>
		</div>
	);
};

export default UserLayout;
