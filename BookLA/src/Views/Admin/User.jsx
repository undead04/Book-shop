import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import UserForm from "../../components/Admin/UserForm";

const User = () => {
	const [users, setUsers] = useState([]);
	const [openUser, setOpenUser] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const fetchData = () => {
		axiosClient.get("/user/all").then((res) => {
			setUsers(res.data.user);
		});
	};

	const handleOpenUserCard = (user) => {
		setSelectedUser(user);
		setOpenUser(true);
	};

	const handleClose = () => {
		setOpenUser(false);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="py-4">
			<div className="panel">
				<table className="w-full">
					<thead>
						<tr className="border-b-2">
							<td></td>
							<td>ID</td>
							<td>Name</td>
							<td>Phone</td>
							<td>...</td>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((i) => (
								<tr
									className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[80px]"
									key={i.id}
								>
									<td>
										<div className="flex itemsc-enter justify-center">
											<img
												className="w-[40px] h-[40px] rounded-full border object-cover object-top"
												src={
													i.avatar
														? `${
																import.meta.env.VITE_API_BASE_URL
														  }/api/image/${i.avatar}`
														: "/default-user.webp"
												}
												alt=""
											/>
										</div>
									</td>
									<td>{i.id}</td>
									<td>{i.userName}</td>
									<td>{i.phone ? i.phone : "0XXXXXXXXX"}</td>
									<td>
										<button onClick={() => handleOpenUserCard(i)}>
											..
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>

				<div>
					{openUser && (
						<>
							<div
								className="fixed inset-0 flex items-center justify-center"
								style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
							>
								<UserForm
									user={selectedUser}
									handleClose={handleClose}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default User;
