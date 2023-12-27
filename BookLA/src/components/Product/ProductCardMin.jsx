import React, { useEffect, useState } from "react";
import Rating from "../Rating";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "./../../axios-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currencyFormatter } from "../../util/currencyFormatter";
import Button from "../Button";
import { useStateContext } from "../../Contexts/ContextProvider";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";

const ProductCardMin = ({ items }) => {
	const { token } = useStateContext();

	const navigator = useNavigate();

	const handleAddToCart = (id, amount) => {
		if (!token) {
			navigator("/login");
			return;
		}

		const storedCart = localStorage.getItem("cart");
		let cart = storedCart ? JSON.parse(storedCart) : [];

		const existingProduct = cart.find((i) => i.id === id);
		if (!!existingProduct) {
			if (existingProduct.quantity < amount) {
				existingProduct.quantity += 1;
				toast("Thêm vào giỏ hàng thành công");
			} else {
				toast("Quá số lượng sản phẩm");
			}
		} else {
			cart.push({ id: id, quantity: 1 });
			toast("Thêm vào giỏ hàng thành công");
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	};

	return (
		<div className="relative group  bg-white dark:bg-black dark:border dark:border-white dark:shadow-sm text-gray-900 dark:text-white shadow-md rounded-lg max-w-sm white:bg-gray-800 white:border-gray-700">
			<ToastContainer />
			<Link to={`/book/${items.id}`}>
				<img
					src={`${import.meta.env.VITE_API_BASE_URL}/api/Image/${
						items.image
					}`}
					className="object-cover w-[320px] h-[366px] mx-auto rounded-t-lg bg-black"
					alt="product image"
				/>
			</Link>
			<div className="py-5 px-3">
				<Link to={`/book/${items.id}`}>
					<h3 className="truncate font-semibold text-xl tracking-tight white:text-white">
						{items.name}
					</h3>
				</Link>
				<div className="ml-auto w-fit">
					<Rating value={items.totalStar} />
				</div>
				<div className="flex items-center justify-end gap-2">
					{items.oldPrice == items.newPrice ? (
						""
					) : (
						<span className="text-sm text-gray-600 font-bold line-through">
							{currencyFormatter.format(items.oldPrice)}
						</span>
					)}
					<span className="text-2xl font-bold">
						{currencyFormatter.format(items.newPrice)}
					</span>
				</div>
			</div>

			<div
				style={{}}
				className="group-hover:flex items-start justify-center absolute inset-0 hidden bg-opacity-75"
			>
				<div className="flex flex-1 justify-around rounded-md py-4 items-center bg-white dark:bg-black">
					<button
						onClick={(e) => {
							e.preventDefault();
							handleAddToCart(items.id, items.quantity);
						}}
					>
						<PlusIcon className="w-8 h-8 dark:text-white text-black hover:text-green-500 hover:scale-150 duration-200" />
					</button>
					<Link to={`/book/${items.id}`}>
						<EyeIcon className="w-8 h-8 dark:text-white text-black hover:text-blue-500 hover:scale-150 duration-200" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCardMin;
