import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import Input from "./Input";
import Button from "./Button";
import { useStateContext } from "../Contexts/ContextProvider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { currencyFormatter } from "../util/currencyFormatter";
import { loadStripe } from "@stripe/stripe-js";

const OrderDetail = ({ orderId, controlOpen }) => {
	const [order, setOrder] = useState({
		userName: "",
		phone: "",
		address: "",
		items: [],
	});

	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = () => {
		try {
			axiosClient.get(`/order/${orderId}`).then((res) => {
				console.log(res.data);
				setOrder(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getTotalPrice = () => {
		const total = order.items.reduce((pre, cur) => {
			return (cur.totalPrice += pre);
		}, 0);
		return total;
	};

	return (
		<div className="w-2/3 h-2/3 overflow-y-scroll px-6 py-12 rounded-2xl bg-white text-black">
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
						disabled
						value={order.userName}
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
						type="number"
						disabled
						value={order.phone}
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
						disabled
						value={order.address}
						className="w-full text-black p-3 my-2 border"
						name="address"
						id="address"
						cols="30"
						rows="3"
					></textarea>
				</div>

				<div className="my-3 border p-3">
					{order.items.map((o, i) => (
						<div
							key={orderId + "-" + o.bookID}
							className="flex items-center gap-4"
						>
							<div className="">{i + 1}.</div>
							<div className="flex-1">
								<div className="truncate text-lg">{o.name}</div>
								{/* name */}

								{/* tac gia */}
								<div className="font-light text-lg">
									{currencyFormatter.format(o.newPrice)}
								</div>
								{/* price */}
							</div>
							<div>
								<div>
									<label htmlFor="quantity">Số lượng</label>
									<input
										disabled
										className="border mx-2 py-2 px-3 w-24"
										type="number"
										value={o.quantity}
										id="quantity"
									/>
								</div>
								<div className="text-gray-400 font-light text-end">
									{currencyFormatter.format(o.totalPrice)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Hình thức thanh toán */}
				{/* <div className="my-3">
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
        </div> */}

				<div className="absolute inset-x-0 bottom-0 bg-red">
					<div className="grid grid-cols-3 gap-4 border-t py-3">
						<div className="col-span-2 text-end">
							<span>Tổng thanh toán</span>
							<div>
								{order.items
									? currencyFormatter.format(getTotalPrice())
									: ""}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
