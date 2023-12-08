import React from "react";

const Cartsm = ({ items }) => {
	return (
		<>
			<header className="border-b border-gray-100 px-5 py-4">
				<div className="font-semibold text-gray-800">Manage Cart</div>
			</header>

			<div className="overflow-x-auto p-3">
				<table className="w-full table-auto bg-white">
					<thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
						<tr>
							<th></th>
							<th className="p-2">
								<div className="text-left font-semibold">Product</div>
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
								<div className="text-left font-semibold">Action</div>
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-100 text-sm">
						{items.map((item, i) => (
							<tr key={i}>
								<td className="p-2">
									<input type="checkbox" className="h-5 w-5" />
								</td>
								<td className="p-2">
									<div className="font-medium text-gray-800">
										{item.name}
									</div>
								</td>
								<td className="p-2">
									<div className="text-left">1</div>
								</td>
								<td className="p-2">
									<div className="text-left font-medium text-green-500">
										{item.price}
									</div>
								</td>
								<td className="p-2">
									<div className="flex justify-center">
										<button>
											<svg
												className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												></path>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Cartsm;
