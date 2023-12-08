import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "./Component/Navbar.jsx";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
	return (
		<div className="container mx-auto">
			<Navbar />
			<div className="grid grid-cols-5 mt-8 gap-8">
				<div className="col-span-1 min-h-screen ">
					<Sidebar />
				</div>
				<div className="col-span-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DefaultLayout;
