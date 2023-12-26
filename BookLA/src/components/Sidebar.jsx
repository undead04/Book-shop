import React, { useEffect, useState } from "react";
import { bookTypesData } from "../menuItemsData";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import axiosClient from "../axios-client";

const Sidebar = () => {
	const [open, setOpen] = useState(true);
	const [category, setCategory] = useState([]);

	useEffect(() => {
		axiosClient.get("/category").then((res) => {
			setCategory(res.data.categorys);
		});
	}, []);
	return (
		<section className="bg-white text-gray-700 dark:bg-gray-950 dark:text-gray-200">
			<Popover>
				<Popover.Button
					className={"block w-full border-none outline-none"}
					onClick={() => setOpen((prev) => !prev)}
				>
					<div className="w-full border py-3 dark:border-gray-600">
						<div>Thế loại</div>
					</div>
				</Popover.Button>

				{open && (
					<div className="dark:border dark:border-gray-600">
						<Popover.Panel static className={"lg:block"}>
							<div className="flex flex-col top-0 left-0 h-full">
								<div className="overflow-y-auto overflow-x-hidden flex-grow">
									<ul className="flex flex-col py-4 space-y-1">
										{category.map((b) => {
											return (
												<li key={b.id}>
													<Link
														to={`/book/type/${b.id}`}
														className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-black dark:text-white dark:hover:text-gray-800 pr-6"
													>
														<span className="ml-6 text-sm tracking-wide truncate font-bold">
															{b.name}
														</span>
													</Link>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</Popover.Panel>
					</div>
				)}
			</Popover>
		</section>
	);
};

export default Sidebar;
