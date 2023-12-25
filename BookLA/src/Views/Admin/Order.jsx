import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

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
				}/api/Order?page=${currentPage}&take=${ORDER_TAKE}`,
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
			.get(`${import.meta.env.VITE_API_BASE_URL}/api/Order?status=0`)
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
			.get(`${import.meta.env.VITE_API_BASE_URL}/api/Order?status=1`)
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
			.get(`${import.meta.env.VITE_API_BASE_URL}/api/Order?status=3`)
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
			.get(`${import.meta.env.VITE_API_BASE_URL}/api/Order?status=-1`)
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
	const handleConfirm = (e, orderID) => {
		e.preventDefault();
		axiosClient
			.put(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/Confirmation/${orderID}`,
			)
			.then((res) => {
				console.log(res);
				fetchWaitOrders();
			});
	};

	const handleFinishDelivery = (e, orderID) => {
		e.preventDefault();
		axiosClient
			.put(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/GiveOrder/${orderID}`,
			)
			.then((res) => {
				fetchWaitDelivery();
			});
	};

	const handleCancel = (e, orderID) => {
		e.preventDefault();
		axiosClient
			.get(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/api/Order/cancelOrder/${orderID}`,
			)
			.then((res) => {
				fetchWaitOrders();
			});
	};
	return (
		<div className="p-4">
			<div className="panel">
				<div className="flex items-center justify-end w-fit gap-2 ml-auto">
					<span className="text-xl">Số trang</span>
					<select
						className="button border my-3"
						onChange={handlePageChange}
					>
						{page.map((p) => (
							<option value={p} key={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<Tab.Group>
					<Tab.List className={"w-full flex justify-around"}>
						<Tab
							className={
								"button border-t-4 border-blue-500 w-full rounded-none py-2"
							}
							onClick={() => setcurrentTab(-2)}
						>
							All
						</Tab>
						<Tab
							className={
								"button border-t-4 border-blue-500 w-full rounded-none py-2"
							}
							onClick={() => setcurrentTab(0)}
						>
							Waiting Confimation
						</Tab>
						<Tab
							className={
								"button border-t-4 border-blue-500 w-full rounded-none py-2"
							}
							onClick={() => setcurrentTab(1)}
						>
							Waiting Delivery
						</Tab>
						<Tab
							className={
								"button border-t-4 border-blue-500 w-full rounded-none py-2"
							}
							onClick={() => setcurrentTab(3)}
						>
							Complete
						</Tab>
						<Tab
							className={
								"button border-t-4 border-blue-500 w-full rounded-none py-2"
							}
							onClick={() => setcurrentTab(-1)}
						>
							Cancel
						</Tab>
					</Tab.List>
					<Tab.Panels className={"p-2 panel my-2"}>
						<Tab.Panel>
							<table className="w-full">
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
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>
													<td>
														<Link to={`/admin/order/${i.orderID}`}>
															..
														</Link>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]">
												<td colSpan={5}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</Tab.Panel>
						<Tab.Panel>
							<table className="w-full">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Status</td>
										<td></td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{waitConfirmationOrders.length > 0 ? (
										<>
											{waitConfirmationOrders.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>
													<td>
														<div className="flex gap-4 justify-center">
															<button
																className="button bg-blue-500 text-white"
																onClick={(e) =>
																	handleConfirm(e, i.orderID)
																}
															>
																Comfirm
															</button>
															<button
																className="button bg-red-500 text-white"
																onClick={(e) =>
																	handleCancel(e, i.orderID)
																}
															>
																Cancel
															</button>
														</div>
													</td>

													<td>
														<Link to={`/admin/order/${i.orderID}`}>
															..
														</Link>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]">
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
							<table className="w-full">
								<thead>
									<tr className="border-b-2">
										<td>ID</td>
										<td>Price</td>
										<td>Order date</td>
										<td>Status</td>
										<td></td>
										<td>...</td>
									</tr>
								</thead>
								<tbody>
									{waitDelivery.length > 0 ? (
										<>
											{waitDelivery.map((i) => (
												<tr
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>
													<td>
														<button
															className="button bg-blue-500 text-white"
															onClick={(e) =>
																handleFinishDelivery(e, i.orderID)
															}
														>
															Comfirm
														</button>
													</td>
													<td>
														<Link to={`/admin/order/${i.orderID}`}>
															..
														</Link>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]">
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
							<table className="w-full">
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
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.dateOfReceiptOfGoods}</td>
													<td>{i.status}</td>
													<td>
														<Link to={`/admin/order/${i.orderID}`}>
															..
														</Link>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]">
												<td colSpan={6}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</Tab.Panel>
						<Tab.Panel>
							<table className="w-full">
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
													className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]"
													key={i.orderID}
												>
													<td>{i.orderID}</td>
													<td>{i.price}</td>
													<td>{i.orderDate}</td>
													<td>{i.status}</td>
													<td>
														<Link to={`/admin/order/${i.orderID}`}>
															..
														</Link>
													</td>
												</tr>
											))}
										</>
									) : (
										<>
											<tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]">
												<td colSpan={5}>Không có dữ liệu</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
};

export default Order;
