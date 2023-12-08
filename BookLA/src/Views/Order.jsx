import React, { useEffect, useState } from "react";
import { textVariant } from "../../../../laravel_react/laravel-react-full-stack/react/src/utils/motion";
import { Link } from "react-router-dom";
const fakeApi = [{}];
const api = "/api/order/userId/status";
const Order = () => {
	// const [, set] = useState();
	const list = [
		{
			title: "All",
			isActive: true,
			api: "",
			status: 1,
		},
		{
			title: "pending_payment",
			isActive: false,
			api: "",
			status: 2,
		},
		{
			title: "pending",
			isActive: false,
			api: "",
			status: 3,
		},
		{
			title: "processing",
			isActive: false,
			api: "",
			status: 4,
		},
		{
			title: "complete",
			isActive: false,
			api: "",
			status: 5,
		},
		{
			title: "cancel",
			isActive: false,
			api: "",
			status: 6,
		},
	];

	const [arrayList, setArrayList] = useState(list);
	const [acTive, setAcTive] = useState(arrayList[0]);
	const onClick = (status) => {
		console.log(status);
		if (acTive.status == status) {
			console.log("Duplicate");
			return;
		}
		// console.log();
		setAcTive(arrayList.find((a) => a.status == status));
		console.log("Change");
	};

	const OrderOptions = [
		{
			title: "Mặc định",
			isActive: true,
			status: 0,
		},
		{
			title: "Từ A - Z",
			isActive: false,
			status: 1,
		},
		{
			title: "Từ Z -A",
			isActive: false,
			status: -1,
		},
	];
	const [order, setOrder] = useState(OrderOptions);

	const handleOrder = (e) => {
		const selectedStatus = e.target.selectedOptions[0].value;
		const options = [...order];
		options.forEach((o, i) => {
			o.isActive = o.status == selectedStatus;
		});
		console.log(options);
		setOrder(options);
	};
	useEffect(() => {
		console.log("Call api status: ", acTive.status);
		//handle Order
		//handle Date
	}, [acTive]);
	return (
		<div className="w-full">
			<div className="py-2">
				<div className="w-fit ml-auto mb-4">
					<label htmlFor="order">Sắp xếp theo:</label>
					<select
						className="bg-white min-w-[80px] px-3 py-2 border mx-2"
						name=""
						id="order"
						onChange={handleOrder}
					>
						{order.map((o, i) => (
							<option key={i} value={o.status}>
								{o.title}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="whitespace-nowrap overflow-scroll">
				{arrayList.map((l, i) => (
					<div
						className={`
									${acTive.status == l.status && "border-b-2 border-gray-500"} 
									${i !== arrayList.length - 1 && "border-r"}
									inline-block
									cursor-pointer
									w-[240px] py-4 bg-white text-center flex-1
									`}
						key={i}
						onClick={() => onClick(l.status)}
					>
						<h5 className="text-2xl font-bold select-none capitalize px-4">
							{l.title}
						</h5>
					</div>
				))}
			</div>
			<div className="my-4">
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Order ID
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Product
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Created at
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Status
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								View more
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="px-5 py-5 bg-white text-sm">
								100032323
							</td>
							<td className="px-5 py-5 bg-white text-sm">
								<p className="text-gray-900 whitespace-no-wrap"></p>
							</td>
							<td className="px-5 py-5 bg-white text-sm">
								<p className="text-gray-900 whitespace-no-wrap">
									Jan 18, 2020
								</p>
							</td>
							<td className="px-5 py-5 bg-white text-sm">
								<span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
									<span
										aria-hidden
										className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
									>
										<span className="relative">Inactive</span>
									</span>
								</span>
							</td>
							<td className="px-5 py-5 bg-white text-sm text-center">
								<Link
									to={"/order/id"}
									className="relative text-red-500 bold"
								>
									...
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Order;
