import React, { useEffect } from "react";
import AdminNavbar from "./Component/AdminNavbar";
import AdminSidebar from "./Component/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

const AdminLayout = () => {
	const { userId } = useStateContext();
	const navigator = useNavigate();
	useEffect(() => {
		axiosClient.get(`/user/${userId}`).then((res) => {
			if (res.data.role == "Admin") {
				navigator("/");
			}
		});
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
