import React from "react";
import Rating from "../Rating";

const ProductCardMin = ({ items }) => {
	return (
		<div className="bg-white shadow-md rounded-lg max-w-sm white:bg-gray-800 white:border-gray-700">
			<a href="#">
				<img
					src={items.image}
					className="w-[320px] h-[366px] mx-auto rounded-t-lg p-8"
					alt="product image"
				/>
			</a>
			<div className="px-5 pb-5">
				<a href="#">
					<h3 className="text-gray-900 font-semibold text-xl tracking-tight white:text-white">
						{items.name}
					</h3>
				</a>
				<Rating value={3.4} />
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-900 white:text-white">
						$599
					</span>
					<a
						href="#"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center white:bg-blue-600 white:hover:bg-blue-700 white:focus:ring-blue-800"
					>
						Add to cart
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductCardMin;
