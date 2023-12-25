import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import Button from "../components/Button";
import OrderDetail from "../components/OrderDetail";
const Order = () => {
	const [orders, setOrders] = useState([]);
	const [waitConfirmationOrders, setWaitConfirmationOrders] =
		useState([]);
	const [waitDelivery, setWaitDelivery] = useState([]);
	const [completeOrders, setCompleteOrders] = useState([]);
	const [cancelledOrders, setCancelledOrders] = useState([]);
	const [page, setPage] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTab, setcurrentTab] = useState(-2);
	const ORDER_TAKE = 7;
	const { userId } = useStateContext();
	const [orderDetailId, setOrderDetailId] = useState(-1);
	const [detailOpen, setDetailOpen] = useState(false);
	const handlePageChange = (e) => {
		console.log(e.target.value);
		setCurrentPage(e.target.value);
	};

	useEffect(() => {
		if (currentTab == -2) {
			fetchAllOrder();
		}

		if (currentTab == 0) {
			fetchWaitOrders();
		}

		if (currentTab == 1) {
			fetchWaitDelivery();
		}

		if (currentTab == 3) {
			fetchCompleteOrders();
		}

		if (currentTab == -1) {
			fetchCancelOrders();
		}
	}, [currentPage, currentTab]);

	const fetchAllOrder = async () => {
		await axiosClient
			.get(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/User/${userId}?page=${currentPage}&take=${ORDER_TAKE}`,
			)
			.then((res) => {
				console.log(res);
				setPage(
					Array.from(
						{ length: res.data.totalPage },
						(_, index) => index + 1,
					),
				);
				setOrders(res.data.order);
			});
	};
	const fetchWaitOrders = async () => {
		await axiosClient
			.get(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/User/${userId}?status=0`,
			)
			.then((res) => {
				setWaitConfirmationOrders(res.data.order);
				setPage(
					Array.from(
						{ length: res.data.totalPage },
						(_, index) => index + 1,
					),
				);
			});
	};
	const fetchWaitDelivery = async () => {
		axiosClient
			.get(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/User/${userId}?status=1`,
			)
			.then((res) => {
				setWaitDelivery(res.data.order);
				setPage(
					Array.from(
						{ length: res.data.totalPage },
						(_, index) => index + 1,
					),
				);
			});
	};

	const fetchCompleteOrders = async () => {
		await axiosClient
			.get(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/User/${userId}?status=3`,
			)
			.then((res) => {
				setCompleteOrders(res.data.order);
				setPage(
					Array.from(
						{ length: res.data.totalPage },
						(_, index) => index + 1,
					),
				);
			});
	};

	const fetchCancelOrders = async () => {
		await axiosClient
			.get(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/User/${userId}?status=-1`,
			)
			.then((res) => {
				setCancelledOrders(res.data.order);
				setPage(
					Array.from(
						{ length: res.data.totalPage },
						(_, index) => index + 1,
					),
				);
			});
	};

	const handleCancel = (e, orderID) => {
		e.preventDefault();
		axiosClient
			.get(
				`${import.meta.env.VITE_API_BASE_URL}
/api/Order/cancelOrder/${orderID}`,
			)
			.then((res) => {
				fetchWaitOrders();
			});
	};

	const handleSeeOrderDetail = (e, orderID) => {
		e.preventDefault();
		setOrderDetailId(orderID);
		setDetailOpen(true);
	};
	return (
		<div className="p-4">
			<div className="panel dark:bg-black bg-white dark:text-white text-black">
				<div className="flex items-center justify-end w-fit gap-2 ml-auto">
					<span className="text-xl">Số trang</span>
					<select
						className="button border my-3 dark:text-white text-black dark:bg-black bg-white"
						onChange={handlePageChange}
					>
						{page.map((p) => (
							<option className="" value={p} key={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<Tab.Group>
					<Tab.List className={"w-full flex justify-around"}>
						<Tab
							className={`${
								currentTab == -2 ? "dark:bg-gray-700 bg-gray-300" : ""
							} button border-t-4 dark:border-blue-700 border-blue-500 w-full rounded-none py-2`}
							onClick={() => setcurrentTab(-2)}
						>
							All
						</Tab>
						<Tab
							className={`${
								currentTab == 0 ? "dark:bg-gray-700 bg-gray-300" : ""
							} button border-t-4 dark:border-blue-700 border-blue-500 w-full rounded-none py-2`}
							onClick={() => setcurrentTab(0)}
						>
							Waiting Confimation
						</Tab>
						<Tab
							className={`${
								currentTab == 1 ? "dark:bg-gray-700 bg-gray-300" : ""
							} button border-t-4 dark:border-blue-700 border-blue-500 w-full rounded-none py-2`}
							onClick={() => setcurrentTab(1)}
						>
							Waiting Delivery
						</Tab>
						<Tab
							className={`${
								currentTab == 3 ? "dark:bg-gray-700 bg-gray-300" : ""
							} button border-t-4 dark:border-blue-700 border-blue-500 w-full rounded-none py-2`}
							onClick={() => setcurrentTab(3)}
						>
							Complete
						</Tab>
						<Tab
							className={`${
								currentTab == -1 ? "dark:bg-gray-700 bg-gray-300" : ""
							} button border-t-4 dark:border-blue-700 border-blue-500 w-full rounded-none py-2`}
							onClick={() => setcurrentTab(-1)}
						>
							Cancel
						</Tab>
					</Tab.List>
					<Tab.Panels className={"p-2 panel my-2 dark:bg-gray-800"}>
						<Tab.Panel>
							<table className="w-full text-center">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Status</td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{orders.length > 0 ? (
										<>
											{orders.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>
													<td>
														<Button
															text={"..."}
															classNames={"button"}
															onClick={(e) =>
																handleSeeOrderDetail(e, i.orderID)
															}
														/>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark">
												<td colSpan={5}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</Tab.Panel>
						<Tab.Panel>
							<table className="w-full text-center">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Status</td>
										<td>Cancel</td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{waitConfirmationOrders.length > 0 ? (
										<>
											{waitConfirmationOrders.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>
													<td>
														<Button
															text={"Cancel"}
															onClick={(e) =>
																handleCancel(e, i.orderID)
															}
															classNames={
																"button bg-red-700 hover:bg-red-900 text-white"
															}
														/>
													</td>
													<td>
														<Button
															text={"..."}
															classNames={"button"}
															onClick={(e) =>
																handleSeeOrderDetail(e, i.orderID)
															}
														/>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark">
												<td colSpan={6}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
							{/* {waitConfirmationOrders.map((i) => (
								<div key={i.orderID}>
									<div>{i.orderID}</div>
									<button
										onClick={(e) => handleConfirm(e, i.orderID)}
									>
										Comfirm
									</button>
								</div>
							))} */}
						</Tab.Panel>
						<Tab.Panel>
							<table className="w-full text-center">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Status</td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{waitDelivery.length > 0 ? (
										<>
											{waitDelivery.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>

													<td>
														<Button
															text={"..."}
															classNames={"button"}
															onClick={(e) =>
																handleSeeOrderDetail(e, i.orderID)
															}
														/>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark">
												<td colSpan={6}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
							{/* {waitDelivery.map((i) => (
								<div key={i.orderID}>{i.orderID}</div>
							))} */}
						</Tab.Panel>
						<Tab.Panel>
							{/* {completeOrders.map((i) => (
								<div key={i.orderID}>{i.orderID}</div>
							))} */}
							<table className="w-full text-center">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Receive date</td>
										<td>Status</td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{completeOrders.length > 0 ? (
										<>
											{completeOrders.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.dateOfReceiptOfGoods}</td>
													<td className="text-green-500 font-bold">
														{i.status}
													</td>
													<td>
														<Button
															text={"..."}
															classNames={"button"}
															onClick={(e) =>
																handleSeeOrderDetail(e, i.orderID)
															}
														/>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark">
												<td colSpan={6}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</Tab.Panel>
						<Tab.Panel>
							<table className="w-full text-center">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Status</td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{cancelledOrders.length > 0 ? (
										<>
											{cancelledOrders.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td className="text-red-600 font-bold">
														{i.status}
													</td>
													<td>
														<Button
															text={"..."}
															classNames={"button"}
															onClick={(e) =>
																handleSeeOrderDetail(e, i.orderID)
															}
														/>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px] dark:text-white text-dark">
												<td colSpan={5}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<>
					{detailOpen ? (
						<div
							className="fixed inset-0 flex items-center justify-center"
							style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
						>
							<OrderDetail
								orderId={orderDetailId}
								controlOpen={[detailOpen, setDetailOpen]}
							/>
						</div>
					) : (
						""
					)}
				</>
			</div>
		</div>
	);
};

export default Order;
