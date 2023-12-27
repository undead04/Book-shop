import {
	MinusCircleIcon,
	PlusCircleIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axios-client";
import { currencyFormatter } from "../util/currencyFormatter";
import Button from "../components/Button";
import BuyingForm from "../components/BuyingForm";
import CartCheckOutForm from "../components/CartCheckOutForm";
import { useStateContext } from "../Contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
	const storedCart = localStorage.getItem("cart");
	let cart = storedCart ? JSON.parse(storedCart) : [];
	const [cartItem, setCartItem] = useState(cart);
	const [proArray, setProArray] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [checkoutCartOpen, setCheckoutCartOpen] = useState(false);
	const [notify, setNotify] = useState({
		isNotify: false,
		message: "",
	});
	const { userId, token, user } = useStateContext();
	const navigate = useNavigate();

	useEffect(() => {
		notification();
	}, [notify.isNotify]);

	const notification = () => {
		if (notify.isNotify && notify.message) {
			toast(notify.message);
		}
		setNotify({
			isNotify: false,
			message: "",
		});
	};

	useEffect(() => {
		if (!token || !userId) {
			navigate("/");
		}

		const fetchData = async () => {
			try {
				const storedCart = localStorage.getItem("cart");
				let cart = storedCart ? JSON.parse(storedCart) : [];
				const promise = cart.map((c) =>
					axiosClient.get(`/book/${c.id}`),
				);
				const result = await Promise.all(promise);

				const newProArray = result.map((r) => ({
					...r.data,
				}));

				setProArray(newProArray);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		if (cartItem.length > 0) {
			setLoading(true);
			fetchData();
			setLoading(false);
		}
	}, [cartItem]);

	const handleChangeAmount = (e, id, equal) => {
		setCartItem((prevCart) => {
			const updatedCart = prevCart.map((item) => {
				if (equal) {
					if (item.id == id) {
						if (equal == "plus") {
							return {
								...item,
								quantity: item.quantity + 1,
							};
						}
						if (equal == "minus" && item.quantity > 1) {
							return {
								...item,
								quantity: item.quantity - 1,
							};
						} else {
							return item;
						}
					}
				}
				if (
					item.id === id &&
					!isNaN(e.target.value) &&
					e.target.value > 0
				) {
					return {
						...item,
						quantity: parseInt(e.target.value),
					};
				}
				return item;
			});
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};
	const getTotalPrice = () => {
		let total = 0;
		proArray.map((p, index) => {
			if (selectedItems.includes(p.id)) {
				total += p.newPrice * cartItem[index].quantity;
			}
		});
		return total;
	};

	const handleRemoveCart = (item) => {
		const newCartItems = cartItem.filter((p) => p != item);
		const newProItems = proArray.filter((p) => p.id != item.id);
		setCartItem(newCartItems);
		setProArray(newProItems);
		console.log(newCartItems);
		localStorage.setItem("cart", JSON.stringify(newCartItems));
	};

	const handleSelectItems = (id) => {
		if (selectedItems.includes(id)) {
			setSelectedItems((prev) => prev.filter((p) => p != id));
		} else {
			setSelectedItems((prev) => [...prev, id]);
		}
	};

	const handleSelectedAll = () => {
		if (selectedItems.length == cartItem.length) {
			setSelectedItems([]);
		} else {
			const newArray = cartItem.map((c) => c.id);
			setSelectedItems(newArray);
		}
	};

	const getSelectedCartItem = () => {
		const newArray = cartItem.filter((c) =>
			selectedItems.includes(c.id),
		);
		return newArray;
	};

	const getSelectedProduct = () => {
		const newArray = proArray.filter((c) =>
			selectedItems.includes(c.id),
		);

		return newArray;
	};

	const handleOpenCheckOutForm = () => {
		setCheckoutCartOpen(true);
	};

	const reloadCart = () => {
		const newArray = cartItem.filter(
			(c) => !selectedItems.includes(c.id),
		);
		const newPro = proArray.filter(
			(p) => !selectedItems.includes(p.id),
		);
		setCartItem(newArray);
		setProArray(newPro);
		localStorage.setItem("cart", JSON.stringify(newArray));
	};
	return (
		<>
			<div className="flex justify-start item-start space-y-2 flex-col">
				<h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-300">
					Giỏ hàng của {user.userName}
				</h1>
				<p className="text-base font-medium leading-6 text-gray-600"></p>
				<ToastContainer />
			</div>
			<div className="mt-7 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
				<div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
					<div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
						<div className="flex items-center gap-4">
							<div>
								<input
									type="checkbox"
									checked={selectedItems.length == cartItem.length}
									onChange={handleSelectedAll}
								/>
							</div>
							<p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
								Mua tất cả
							</p>
						</div>
						{!loading ? (
							<>
								{proArray.length > 0 ? (
									proArray.map((p, index) => (
										<div key={p.id} className="w-full">
											<div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
												<input
													type="checkbox"
													value={p.id}
													checked={selectedItems.includes(p.id)}
													onChange={() => handleSelectItems(p.id)}
												/>
												<div className="pb-4 md:pb-8 w-full md:w-40">
													<img
														className="w-full"
														src={`${
															import.meta.env.VITE_API_BASE_URL
														}/api/Image/${p.image}`}
														alt="book"
													/>
												</div>
												<div className="border-b items-stretch border-gray-200 md:flex-row flex-col flex justify-between w-full pb-8 space-y-4 md:space-y-0 h-full">
													<div className="w-full flex flex-col justify-start items-start space-y-8">
														<Link
															to={`/book/${p.id}`}
															className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"
														>
															{p.name}
														</Link>
														<div className="flex justify-start items-start flex-col space-y-2">
															<p className="text-sm dark:text-white leading-none text-gray-800">
																<span className="dark:text-gray-400 text-gray-300">
																	Author:{" "}
																</span>{" "}
																{p.author}
															</p>
															<p className="text-sm dark:text-white leading-none text-gray-800">
																<span className="dark:text-gray-400 text-gray-300">
																	Publisher:{" "}
																</span>{" "}
																{p.publisher}
															</p>
															<p className="text-sm dark:text-white leading-none text-gray-800">
																<span className="dark:text-gray-400 text-gray-300">
																	Supplier:{" "}
																</span>{" "}
																{p.supplier}
															</p>
														</div>
													</div>
													<div className="flex flex-col items-end justify-between">
														<div className="flex justify-between items-center space-x-8 w-full flex-1">
															<p className="text-base dark:text-white xl:text-lg leading-6">
																{currencyFormatter.format(p.newPrice)}
																<span className="text-red-300 line-through">
																	{" "}
																	{currencyFormatter.format(
																		p.oldPrice,
																	)}
																</span>
															</p>
															<p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
																<span className="flex items-center">
																	<button
																		onClick={(e) => {
																			e.preventDefault();
																			handleChangeAmount(
																				"",
																				p.id,
																				"minus",
																			);
																		}}
																	>
																		<MinusCircleIcon className="w-6 h-6 text-white" />
																	</button>
																	<input
																		type="number"
																		value={
																			cart[index].quantity
																				? cart[index].quantity
																				: 0
																		}
																		onChange={(e) =>
																			handleChangeAmount(e, p.id)
																		}
																		className="w-8 text-black mx-2 text-center"
																	/>
																	<button
																		onClick={(e) => {
																			e.preventDefault();
																			handleChangeAmount(
																				"",
																				p.id,
																				"plus",
																			);
																		}}
																	>
																		<PlusCircleIcon className="w-6 h-6 text-white" />
																	</button>
																</span>
															</p>
															<p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
																{currencyFormatter.format(
																	p.newPrice *
																		cartItem[index].quantity,
																)}
															</p>
														</div>
														<div>
															<div className="flex items-center gap-2">
																<Button
																	text={"Xóa"}
																	classNames={"text"}
																	onClick={() =>
																		handleRemoveCart(cartItem[index])
																	}
																/>
																<TrashIcon className="w-4 h-4 text" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									))
								) : (
									<>
										<div className="min-h-[600px]">
											<h5 className="text-center text-2xl dark:text-white text-black ">
												Không có sản phẩm nào được thêm vào giỏ hàng.
											</h5>
											<Link
												to="/book/all"
												className="dark:text-white my-4 text-2xl"
											>
												Chọn sách?
											</Link>
										</div>
									</>
								)}
							</>
						) : (
							<>
								<div className="text-center text-xl font-bold">
									Loading...
								</div>
							</>
						)}
					</div>{" "}
					{cartItem.length > 0 && (
						<div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
							{" "}
							<div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
								{" "}
								<h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
									Tổng kết
								</h3>
								<div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
									<div className=" w-full">
										<div key={"13"}>
											{proArray.map((p, index) => (
												<>
													{selectedItems.includes(
														cartItem[index].id,
													) ? (
														<div key={index}>
															<div className="flex justify-between items-center">
																<div className="text-white">
																	{index + 1 + "."}{" "}
																</div>
																<p className="text-base dark:text-gray-300 leading-4 text-gray-600">
																	+{" "}
																	{currencyFormatter.format(
																		p.newPrice *
																			cartItem[index].quantity,
																	)}
																</p>
															</div>
														</div>
													) : (
														<></>
													)}
												</>
											))}
										</div>
									</div>
								</div>
								<div className="flex justify-between items-center w-full">
									<p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
										Total
									</p>
									<p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
										{currencyFormatter.format(getTotalPrice())}
									</p>
								</div>
							</div>
							<div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
								<h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
									Checkout
								</h3>
								<div className="flex justify-between items-start w-full"></div>
								<div className="w-full flex justify-center items-center">
									<Button
										disabled={selectedItems.length == 0}
										text={"Checkout Now"}
										className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
										onClick={handleOpenCheckOutForm}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
					<h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
						Customer
					</h3>
					<div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
						<div className="flex flex-1 flex-col justify-start items-start flex-shrink-0">
							<div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
								<img
									className="w-12 h-12 object-top object-cover"
									src={
										user.avatar
											? `${
													import.meta.env.VITE_API_BASE_URL
											  }/api/image/${user.avatar}`
											: "./default-user.webp"
									}
									alt="avatar"
								/>
								<div className="flex justify-start items-start flex-col space-y-2">
									<p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
										{user.userName}
									</p>
								</div>
							</div>
							<div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
								<svg
									width={24}
									height={24}
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M3 7L12 13L21 7"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<p className="cursor-pointer text-sm leading-5 ">
									{user.email}
								</p>
							</div>
						</div>
					</div>
					<>
						{checkoutCartOpen && (
							<div
								className="fixed inset-0 flex items-center justify-center p-8"
								style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
							>
								<CartCheckOutForm
									carts={getSelectedCartItem()}
									controlOpen={[
										checkoutCartOpen,
										setCheckoutCartOpen,
									]}
									proArray={getSelectedProduct()}
									total={getTotalPrice()}
									reload={reloadCart}
									setNotify={setNotify}
								/>
							</div>
						)}
						z
					</>
				</div>
			</div>
		</>
	);
};

export default Cart;
