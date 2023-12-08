import React from "react";

const Brand = () => {
	return (
		<a href="/" className="flex text-lg font-semibold">
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
		</a>
	);
};

export default Brand;
