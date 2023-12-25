import React, { useEffect } from "react";
import AdminNavbar from "./Component/AdminNavbar";
import AdminSidebar from "./Component/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
	useEffect(() => {
		//check admin
	}, []);
	return (
		<>
			<AdminNavbar />

			<AdminSidebar />

			<Outlet />
		</>
	);
};

export default AdminLayout;
