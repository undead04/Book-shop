import React, { useEffect, useRef, useState } from "react";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
	BanknotesIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import DynamicHeroIcon from "./../../components/DynamicHeroIcon";

import { currencyFormatter } from "../../util/currencyFormatter";
import axiosClient from "../../axios-client";

ChartJS.register(
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
);

const data = {
	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3, 5, 2, 3],
			borderWidth: 1,
			backgroundColor: ["red", "blue", "green"],
			borderColor: "black",
		},
	],
};

var options = {
	maintainAspectRatio: false,
	scales: {},
	legend: {
		labels: {
			fontSize: 25,
		},
	},
	layout: {
		padding: 10,
	},
};

const adminTabs = [
	{
		title: "Total users",
		amount: "100",
		icon: "UserGroupIcon",
	},
	{
		title: "Total books",
		amount: "1000",
		icon: "BookOpenIcon",
	},
	{
		title: "Total benefit",
		amount: "54321",
		icon: "CreditCardIcon",
		currency: true,
	},
	{
		title: "Today's money",
		amount: "2000",
		icon: "BanknotesIcon",
		currency: true,
	},
];

const AdminHome = () => {
	const [incomeData, setIncomeData] = useState([]);
	const [orderDate, setOrderDate] = useState([]);
	const fetchData = () => {
		axiosClient.get("/order?status=3").then((res) => {
			let totalPrice = 0;
			setIncomeData(
				res.data.order.map((o, i) => {
					if (i >= 0) {
						totalPrice += o.price;
					} else {
						totalPrice = o.price;
					}
					return totalPrice;
				}),
			);
			setOrderDate(res.data.order.map((o) => o.orderDate));
		});
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
				<div className="col-span-3 bg-white shadow-lg rounded-lg my-4 p-4">
					{/* <div className="col-span-1">
							<div className="shadow-md p-4">
								<div className="text-3xl">Notification</div>
								<div className="relative px-4">
									<div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-200  rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm text-black dark:text-white">
												Profile informations changed.
											</p>
											<p className="text-xs text-gray-500">
												3 min ago
											</p>
										</div>
									</div>
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-200 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm text-black dark:text-white">
												Connected with{" "}
												<a
													href="#"
													className="text-blue-600 font-bold"
												>
													Colby Covington
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">
												15 min ago
											</p>
										</div>
									</div>
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-200 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm text-black dark:text-white">
												Invoice{" "}
												<a
													href="#"
													className="text-blue-600 font-bold"
												>
													#4563
												</a>{" "}
												was created.
											</p>
											<p className="text-xs text-gray-500">
												57 min ago
											</p>
										</div>
									</div>
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-200 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm text-black dark:text-white">
												Message received from{" "}
												<a
													href="#"
													className="text-blue-600 font-bold"
												>
													Cecilia Hendric
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">
												1 hour ago
											</p>
										</div>
									</div>
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-200 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm text-black dark:text-white">
												New order received{" "}
												<a
													href="#"
													className="text-blue-600 font-bold"
												>
													#OR9653
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">
												2 hours ago
											</p>
										</div>
									</div>
									<div className="flex items-center w-full my-6 -ml-1.5">
										<div className="w-1/12 z-10">
											<div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-200 rounded-full" />
										</div>
										<div className="w-11/12">
											<p className="text-sm text-black dark:text-white">
												Message received from{" "}
												<a
													href="#"
													className="text-blue-600 font-bold"
												>
													Jane Stillman
												</a>
												.
											</p>
											<p className="text-xs text-gray-500">
												2 hours ago
											</p>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					<div className="shadow-md p-4 h-full">
						<div className="flex flex-col h-full">
							<div className="text-3xl">Income</div>
							<div className="p-4 flex-1">
								<Line
									data={{
										labels: orderDate || data.labels,
										datasets: [
											{
												label: "VND",
												data: incomeData || [12, 19, 3, 5, 2, 3],
												borderWidth: 1,
												backgroundColor: ["red", "blue", "green"],
												borderColor: "black",
											},
										],
									}}
									options={options}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-1 bg-white shadow-lg  rounded-lg my-4 p-4">
					<div className="grid grid-cols-1 h-full">
						{adminTabs.map((a, i) => (
							<div key={i} className="p-4 shadow-md round">
								<div className="flex items-center h-full">
									<div className="flex-1 text-end">
										<h5 className="text-gray-400 text-2xl">
											{a.title}
										</h5>
										<p className="font-bold text-3xl">
											{a.amount && a.currency
												? currencyFormatter.format(a.amount)
												: a.amount}
										</p>
									</div>
									<div className="flex-1">
										<div className="w-fit mx-auto rounded-full border-2 border-black p-3">
											<DynamicHeroIcon
												icon={a.icon}
												color={"black"}
												size={12}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
