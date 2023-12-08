import React, { useState } from "react";
import { bookTypesData } from "../menuItemsData";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";

const Sidebar = () => {
	const [open, setOpen] = useState(true);
	return (
		<>
			<Popover>
				<Popover.Button
					className={"block w-full border-none outline-none"}
					onClick={() => setOpen((prev) => !prev)}
				>
					<div className="w-full border py-3">
						<div>DANH MỤC SÁCH</div>
					</div>
				</Popover.Button>

				{open && (
					<div>
						<Popover.Panel static className={"lg:block"}>
							<div className="flex flex-col top-0 left-0  bg-white h-full border-r">
								<div className="overflow-y-auto overflow-x-hidden flex-grow">
									<ul className="flex flex-col py-4 space-y-1">
										{bookTypesData.map((b, index) => {
											return (
												<>
													{b.submenu ? (
														<li key={"headType" + index}>
															<ul>
																<li className="px-5">
																	<div className="flex flex-row items-center h-8">
																		<div className="text-xl font-light tracking-wide text-gray-500">
																			{b.title}
																			{console.log(index)}
																		</div>
																	</div>
																</li>
																{b.submenu.map((s, i) => (
																	<li key={"type" + i}>
																		<Link
																			to="#"
																			className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l hover:border-indigo-500 pr-6"
																		>
																			<span className="inline-flex justify-center items-center ml-4"></span>
																			<span className="ml-2 text-sm tracking-wide truncate">
																				{s.title}
																			</span>
																		</Link>
																	</li>
																))}
															</ul>
														</li>
													) : (
														<li key={"heasdad" + index}>
															<a
																href="#"
																className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
															>
																<span className="inline-flex justify-center items-center ml-4"></span>
																<span className="ml-2 text-sm tracking-wide truncate font-bold">
																	{b.title}
																</span>
															</a>
														</li>
													)}
												</>
											);
										})}
									</ul>
								</div>
							</div>
						</Popover.Panel>
					</div>
				)}
			</Popover>
		</>
	);
};

export default Sidebar;
