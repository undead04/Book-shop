import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { loadStripe } from "@stripe/stripe-js";
import { currencyFormatter } from "../util/currencyFormatter";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios-client";

const CartCheckOutForm = ({
	carts,
	proArray,
	total,
	controlOpen,
	reload,
	setNotify,
}) => {
	const [paymentMethod, setPaymentMethod] = useState(1);
	const { user, userId, token } = useStateContext();
	const [username, setUsername] = useState(user.userName);
	const [phoneNumber, setPhoneNumber] = useState(user.phone);
	const addressRef = useRef();
	const handleChangePaymentMethod = (e) => {
		setPaymentMethod(e.target.value);
	};

	const handleOrder = () => {
		if (userId && token) {
			let apiUrl = "/shopping/buy";
			if (paymentMethod == 2) {
				apiUrl = "/shopping/buyoffline";
			}
			const data = {
				userId: userId,
				userName: username,
				phone: phoneNumber,
				address: addressRef.current.value,
				books: carts,
			};

			axiosClient
				.post(apiUrl, JSON.stringify(data), {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					if (res.errorCode == 0) {
						reload();
						controlOpen[1](false);
						setNotify({
							isNotify: true,
							message: "Thành công!",
						});
						if (res.data.pubKey && res.data.sessionId) {
							handleBuyOnline(res.data.pubKey, res.data.sessionId);
						} else {
							console.log(res);
						}
						controlOpen[1](false);
					} else {
						setNotify({
							isNotify: true,
							message: "Lỗi xảy ra",
						});
					}
				});
		} else {
			console.log("You need login");
		}
	};

	const handleBuyOnline = async (pubKey, sessionId) => {
		try {
			const stripe = await loadStripe(pubKey);
			const { error } = await stripe.redirectToCheckout({
				sessionId: sessionId,
			});

			if (!error) {
				window
					.open("about:blank")
					.document.write("<h1>Loading...</h1>");

				// Redirect to the Checkout page in the new tab
				window.open(sessionId, "_blank");
			}
			if (error) {
				// Handle error
				console.error(error.message);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="w-2/3 h-3/4 overflow-scroll px-6 py-12 rounded-lg bg-white text-black">
			<div className="relative pb-24 text-xl">
				<div className="flex items-center justify-between">
					<div className="text-3xl">Thông tin thanh toán</div>
					<XMarkIcon
						className="w-6 h-6"
						onClick={() => controlOpen[1](false)}
					/>
				</div>
				<div className="py-4">
					<label className="block text-black" htmlFor="address">
						Tên người nhận
					</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full text-black p-3 my-2 border"
						name="username"
						id="username"
					/>
				</div>
				<div className="py-4">
					<label className="block text-black" htmlFor="address">
						Số điện thoại
					</label>
					<input
						value={phoneNumber || ""}
						onChange={(e) => setPhoneNumber(e.target.value)}
						className="w-full text-black p-3 my-2 border"
						name="phone"
						id="phone"
					/>
				</div>
				<div className="py-4">
					<label className="block text-black" htmlFor="address">
						Địa chỉ nhận hàng
					</label>
					<textarea
						ref={addressRef}
						className="w-full text-black p-3 my-2 border"
						name="address"
						id="address"
						cols="30"
						rows="3"
					></textarea>
				</div>

				{proArray.map((p, index) => (
					<>
						<div className="my-3 border p-3">
							<div>{p.publisher}</div>
							<div className="flex items-center gap-4">
								<div>
									<img
										src={`${
											import.meta.env.VITE_API_BASE_URL
										}/api/Image/${p.image}`}
										alt=""
										className="w-[60px] h-[60px]"
									/>
								</div>
								<div className="flex-1">
									<div className="truncate text-lg">{p.name}</div>
									{/* name */}
									<div className="text-gray-400 font-light">
										{p.author}
									</div>
									{/* tac gia */}
									<div className="font-light text-lg">
										{currencyFormatter.format(p.newPrice)}
									</div>
									{/* price */}
								</div>
								<div>
									<label htmlFor="quantity">Số lượng</label>
									<span className="border mx-2 py-2 px-3 w-24">
										{carts[index].quantity}
									</span>
								</div>
							</div>
						</div>
					</>
				))}
				<div className="my-3">
					<h5>Hình thức thanh toán</h5>
					<div className="flex items-center gap-4 my-2">
						<div>
							<input
								onChange={handleChangePaymentMethod}
								checked={paymentMethod == 1}
								value={1}
								name="paymentMethod"
								type="radio"
								id="onlinePayment"
							/>{" "}
							<label htmlFor="onlinePayment">Trực tuyến</label>
						</div>
						<div>
							<input
								onChange={handleChangePaymentMethod}
								checked={paymentMethod == 2}
								value={2}
								name="paymentMethod"
								type="radio"
								id="offlinePayment"
							/>{" "}
							<label htmlFor="offlinePayment">Trực tiếp</label>
						</div>
					</div>
				</div>

				<div className="absolute inset-x-0 bottom-0 bg-red">
					<div className="grid grid-cols-3 gap-4 border-t py-3">
						<div className="col-span-2 text-end">
							<span>Tổng thanh toán</span>
							<div>{currencyFormatter.format(total)}</div>
						</div>

						<Button
							text={"Đặt hàng"}
							onClick={handleOrder}
							classNames={"button bg-red-400 text-white"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartCheckOutForm;
