import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

const User = () => {
	const [users, setUsers] = useState([]);
	const fetchData = () => {
		axiosClient.get("/user").then((res) => {
			console.log(res.data.user);
			setUsers(res.data.user);
		});
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
												className="w-[40px] h-auto"
												src="/default-user.webp"
												alt=""
											/>
										</div>
									</td>
									<td>{i.id}</td>
									<td>{i.userName}</td>
									<td>{i.phone ? i.phone : "0XXXXXXXXX"}</td>
									<td>
										<Link to={`/admin/user/${i.id}`}>..</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default User;
