import React from "react";
import { Link } from "react-router-dom";

const Brand = () => {
	return (
		<Link to="/" className="flex text-lg font-semibold">
			<img
				src="https://dev.rz-codes.com/static/logo-275e932fd817cc84d99d91f7519a9a22.svg"
				width={50}
				height={50}
				className="p-2"
				alt=""
			/>
			<div className="lg:block hidden mt-3 text-red-600">
				LA BOOKS
			</div>
		</Link>
	);
};

export default Brand;
