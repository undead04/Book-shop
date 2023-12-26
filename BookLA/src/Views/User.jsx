import {
	PencilIcon,
	ShoppingCartIcon,
	ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../util/currencyFormatter";
import UserForm from "../components/UserForm";
const User = () => {
	const { user, userId, setUser } = useStateContext();
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const [userOrders, setUserOrders] = useState({
		order: [],
		totalPage: 0,
	});
	const [cartLength, setCartLength] = useState(0 || cart.length);
	const [openEditProfile, setOpenEditProfile] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		axiosClient
			.get(`/Order/User/${userId}?page=1&take=25`)
			.then((res) => {
				setLoading(true);
				console.log(res.data);
				setUserOrders(res.data);
				setLoading(false);
			});
	}, []);

	const getTotalPrice = () => {
		if (userOrders) {
			const price = userOrders.order.reduce((pre, cur) => {
				if (cur.status == "Complete") {
					return (pre += cur.price);
				}
				return pre;
			}, 0);
			return price;
		}

		return 0;
	};
	return (
		<>
			{!loading && (
				<div>
					{openEditProfile && (
						<div
							className="fixed inset-0 flex items-center justify-center p-8"
							style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
						>
							<div
								className="fixed inset-0 flex items-center justify-center"
								style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
							>
								<UserForm
									user={user}
									controlForm={[openEditProfile, setOpenEditProfile]}
								/>
							</div>
						</div>
					)}
					<div className="bg-white dark:bg-black dark:text-white rounded-lg shadow-xl pb-8">
						<div className="w-full h-[250px]">
							<img
								src={
									"https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
								}
								className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
							/>
						</div>
						<div className="flex flex-col items-center -mt-20">
							<img
								src={
									user.avatar
										? `${
												import.meta.env.VITE_API_BASE_URL
										  }/api/image/${user.avatar}`
										: "./default-user.webp"
								}
								className="w-40 h-40 object-cover border-4 border-white rounded-full"
							/>
							<div className="flex items-center space-x-2 mt-2">
								<p className="text-2xl">{user.userName}</p>
							</div>
						</div>
						<div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
							<div className="flex items-center space-x-4 mt-2">
								<button
									onClick={() => setOpenEditProfile(true)}
									className="flex items-center bg-blue-600  hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
								>
									<PencilIcon
										fill="currentColor"
										className="text-white w-4 h-4 mr-1"
									/>
									<span>Edit your profile</span>
								</button>
							</div>
						</div>
					</div>

					<div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
						<div className="w-full flex flex-col 2xl:w-1/3">
							<div className="flex-1 bg-white dark:bg-black rounded-lg shadow-xl p-8">
								<h4 className="text-xl text-gray-900 dark:text-gray-200 font-bold">
									Personal Info
								</h4>
								<ul className="mt-2 text-gray-700 dark:text-gray-300">
									<li className="flex border-y py-2">
										<span className="font-bold w-24">Full name:</span>
										<span>{user.userName}</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Joined:</span>
										<span>{user.create_at}</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Phone:</span>
										<span>
											{user.phone ? (
												user.phone
											) : (
												<>Dữ liệu chưa được cập nhật</>
											)}
										</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Email:</span>
										<span>{user.email}</span>
									</li>
									<li className="flex border-b py-2">
										<span className="font-bold w-24">Location:</span>
										<span>
											{user.address ? (
												user.address
											) : (
												<>Không có dữ liệu</>
											)}
										</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="flex flex-col w-full 2xl:w-2/3">
							<div className="flex-1 bg-white dark:bg-black rounded-lg shadow-xl p-8">
								<h4 className="text-xl text-gray-900 dark:text-white font-bold">
									About
								</h4>
								<p className="mt-2 text-gray-700 dark:text-gray-300">
									{user.about ? (
										<>{user.about}</>
									) : (
										<>Không có thông tin</>
									)}
								</p>
							</div>
							<div className="flex-1 bg-white dark:bg-gray-950 rounded-lg shadow-xl mt-4 p-8">
								<h4 className="text-xl text-gray-900 dark:text-gray-300 font-bold">
									Statistics
								</h4>
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
									<div className="px-6 py-6 bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-xl">
										<div className="flex items-center justify-between">
											<span className="font-bold text-sm text-indigo-600">
												Bạn đã đóng góp
											</span>
										</div>
										<div className="flex items-center justify-between mt-6">
											<div>
												<svg
													className="w-12 h-12 p-2.5 dark:bg-opacity-80 dark:text-gray-200 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1}
														d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<div className="flex items-end">
													<span className="text-2xl 2xl:text-3xl font-bold">
														{currencyFormatter.format(
															getTotalPrice(),
														)}
													</span>
													<div className="flex items-center ml-2 mb-1">
														<svg
															className="w-5 h-5 text-green-500"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
															/>
														</svg>
													</div>
												</div>
											</div>
										</div>
									</div>
									<Link
										to={"/order"}
										className="px-6 py-6 bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-xl"
									>
										<div className="flex items-center justify-between">
											<span className="font-bold text-sm text-blue-600">
												Orders
											</span>
										</div>
										<div className="flex items-center justify-between mt-6">
											<div>
												<svg
													className="w-12 h-12 p-2.5 dark:bg-opacity-80 dark:text-gray-200 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1}
														d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<div className="flex items-end">
													<span className="text-2xl 2xl:text-3xl font-bold">
														{userOrders &&
															userOrders.order.length *
																userOrders.totalPage}
														{""}+
													</span>
												</div>
											</div>
										</div>
									</Link>

									<Link
										to="/cart"
										className="px-6 py-6 bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-xl"
									>
										<div className="flex items-center justify-between">
											<span className="font-bold text-sm text-green-600">
												Cart List
											</span>
										</div>
										<div className="flex items-center justify-between mt-6">
											<div>
												<ShoppingCartIcon className="w-12 h-12 p-2.5 dark:bg-opacity-80 dark:text-gray-200 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" />
											</div>
											<div className="flex flex-col">
												<div className="flex items-end">
													<span className="text-2xl 2xl:text-3xl font-bold">
														{cartLength}
													</span>
												</div>
											</div>
										</div>
									</Link>
								</div>
								<div className="mt-4">
									<canvas
										id="verticalBarChart"
										style={{
											display: "block",
											boxSizing: "border-box",
											height: 414,
											width: 828,
										}}
										width={1656}
										height={828}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default User;
