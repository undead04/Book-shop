import React, { useEffect, useState } from "react";
import Rating from "../Rating";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "./../../axios-client";
import { currencyFormatter } from "../../util/currencyFormatter";
import Button from "../Button";
import { useStateContext } from "../../Contexts/ContextProvider";

const ProductCardMin = ({ items }) => {
	const { token } = useStateContext();
	const navigator = useNavigate();
	const handleAddToCart = (id, amount) => {
		if (!token) {
			navigator("/login");
			return;
		}
		console.log(amount);

		const storedCart = localStorage.getItem("cart");
		console.log("Hello there");
		let cart = storedCart ? JSON.parse(storedCart) : [];

		const existingProduct = cart.find((i) => i.id === id);
		console.log(!!existingProduct);
		if (!!existingProduct) {
			if (existingProduct.quantity < amount) {
				existingProduct.quantity += 1;
				console.log("This product is added to cart");
			} else {
				console.log("This is overload quantity for this product");
			}
		} else {
			cart.push({ id: id, quantity: 1 });
			console.log("Added product into cart");
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	};

	return (
		<div className="relative group  bg-white dark:bg-black dark:border dark:border-white dark:shadow-sm text-gray-900 dark:text-white shadow-md rounded-lg max-w-sm white:bg-gray-800 white:border-gray-700">
			<Link to={`/book/${items.id}`}>
				<img
					src={`${import.meta.env.VITE_API_BASE_URL}/api/Image/${
						items.image
					}`}
					className="w-[320px] h-[366px] mx-auto rounded-t-lg p-8"
					alt="product image"
				/>
			</Link>
			<div className="px-5 pb-5">
				<Link to={`/book/${items.id}`}>
					<h3 className=" font-semibold text-xl tracking-tight white:text-white">
						{items.name}
					</h3>
				</Link>
				<Rating value={items.totalStar} />
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold">
						{currencyFormatter.format(items.newPrice)}
					</span>
				</div>
			</div>

			<div className="group-hover:flex items-center justify-center absolute inset-0 hidden group-hover:bg-opacity-25 bg-blue-700">
				<div className="flex flex-col">
					<Button
						text={"Add to cart"}
						primary
						classNames={
							"flex-1 block mb-2 border border-white p-4 bg-black text-white hover:bg-white hover:text-black transition-all duration-3000"
						}
						onClick={(e) => {
							e.preventDefault();
							handleAddToCart(items.id, items.quantity);
						}}
					/>

					<Button
						text={"View more"}
						primary
						classNames={
							"flex-1 border border-white p-4 bg-white text-black hover:bg-black hover:text-white transition-all duration-3000"
						}
						to={`/book/${items.id}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCardMin;
