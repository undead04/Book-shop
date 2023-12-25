import React from "react";
import { Outlet } from "react-router-dom";

const AdminMain = () => {
	return (
		<div className="mt-14 ml-64">
			<div className="px-3">
				<Outlet />
			</div>
		</div>
	);
};

export default AdminMain;
