import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { currencyFormatter } from "../../util/currencyFormatter";
import { Link } from "react-router-dom";

const Cartsm = ({ items = [] }) => {
	const [cartList, setCartList] = useState(items);
	const [cartBooks, setCartBooks] = useState([]);
	useEffect(() => {
		fetchData();
	}, [cartList]);

	const fetchData = async () => {
		const promise = cartList.map((i) =>
			axiosClient.get(`/book/${i.id}`),
		);

		const result = await Promise.all(promise);

		setCartBooks(result.map((r) => r.data));
	};

	const handleRemoveCartItem = (e, item) => {
		e.preventDefault();
		const { id } = item;
		const newCartList = cartList.filter((p) => p.id != id);
		setCartList(newCartList);
		console.log(cartBooks);
		localStorage.setItem("cart", JSON.stringify(newCartList));
	};
	return (
		<>
			<header className="border-b border-gray-100 px-5 py-4">
				<div className="font-semibold">Manage Cart</div>
			</header>

			<div className="overflow-x-auto p-3">
				{cartBooks.length > 0 ? (
					<table className="w-full table-auto ">
						<thead className="text-xs font-semibold uppercase text-gray-400">
							<tr>
								<th></th>
								<th className="p-2">
									<div className="text-left font-semibold">
										Product
									</div>
								</th>
								<th className="p-2">
									<div className="text-left font-semibold">
										Quantity
									</div>
								</th>
								<th className="p-2">
									<div className="text-left font-semibold">Total</div>
								</th>
								<th className="p-2">
									<div className="text-left font-semibold">
										Action
									</div>
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-100 text-sm">
							{cartBooks.map((item, i) => (
								<tr key={i}>
									<td></td>
									<td className="p-2">
										<div className="font-medium">
											{cartBooks[i].name}
										</div>
									</td>
									<td className="p-2">
										<div className="text-left">
											{items[i].quantity}
										</div>
									</td>
									<td className="p-2">
										<div className="text-left font-medium text-green-500">
											{currencyFormatter.format(
												items[i].quantity * item.newPrice,
											)}
										</div>
									</td>
									<td className="p-2">
										<div className="flex justify-center">
											<button
												onClick={(e) =>
													handleRemoveCartItem(e, items[i])
												}
											>
												<svg
													className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</div>
									</td>
								</tr>
							))}

							<tr>
								<td colSpan={5}>
									<div className="pt-2 text-xl text-blue-500 font-semibold text-end hover:text-blue-400">
										<Link to="/cart">View more</Link>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<>
						<div className="min-w-[300px] text-center font-bold">
							Không có sản phẩm nào được thêm
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Cartsm;
