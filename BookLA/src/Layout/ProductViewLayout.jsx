import React from "react";
import Navbar from "./Component/Navbar";
import { Outlet } from "react-router-dom";

const ProductViewLayout = () => {
	return (
		<div className="container mx-auto">
			<Navbar />
			<div className="mt-8">
				<Outlet />
			</div>
		</div>
	);
};

export default ProductViewLayout;
