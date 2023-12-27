import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
	return (
		<>
			<nav className="fixed top-0 inset-x-0 z-10 bg-blue-500 p-4 flex items-center justify-between">
				<div>
					<Link
						to={"/admin"}
						className="text-white text-xl font-semibold"
					>
						BOOKLA
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<span className="text-white">ADMIN</span>
					<i className="fas fa-user-circle text-white text-2xl"></i>
				</div>
				<i className="fas fa-user-circle text-white text-2xl"></i>
			</nav>
			<i className="fas fa-user-circle text-white text-2xl"></i>
		</>
	);
};

export default AdminNavbar;
