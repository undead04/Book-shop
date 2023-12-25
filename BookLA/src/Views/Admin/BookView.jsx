import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { currencyFormatter } from "../../util/currencyFormatter";
import Pagination from "../../components/Pagination";
import Table from "../../components/Admin/Table";
import Button from "../../components/Button";
import MDialog from "../../components/Dialog";
import { LogarithmicScale } from "chart.js";

const BookView = () => {
	const [books, setBooks] = useState([]);
	const [page, setPage] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const field = [
		{
			type: "checkbox",
			keyName: "name",
		},
		{
			type: "text",
			fieldName: "Book's name",
			keyName: "name",
		},
		{
			type: "image",
			fieldName: "Image",
			keyName: "image",
		},
		{
			type: "arrayString",
			fieldName: "Category(s)",
			keyName: "nameCategory",
		},
		{
			type: "money",
			fieldName: "Price",
			keyName: "newPrice",
		},
	];
	const [isChecked, setIsChecked] = useState(false);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	useEffect(() => {
		fetchData();
	}, [currentPage]);

	const handleCheckboxChange = (newState) => {
		setIsChecked(newState);

		if (newState) {
			if (books.find((c) => c.checked === false) || !isSelectedAll) {
				setBooks((prev) =>
					prev.map((p) => ({ ...p, checked: true })),
				);
			}

			setIsSelectedAll(true);
		}

		if (isSelectedAll) {
			setBooks((prev) => prev.map((p) => ({ ...p, checked: false })));

			setIsSelectedAll(false);
		}
	};

	const handleSelectedItem = (id) => {
		setBooks((prev) =>
			prev.map((p) => {
				if (p.id === +id) {
					if (p.checked == true) {
						setIsChecked(false);
						setIsSelectedAll(false);
					}

					return { ...p, checked: !p.checked };
				}

				return p;
			}),
		);
	};
	const fetchData = () => {
		try {
			axiosClient
				.get(`/Filter?page=${currentPage}&take=6`)
				.then((res) => {
					setBooks(
						res.data.book.map((r) => ({ ...r, checked: false })),
					);

					setPage(
						Array.from(
							{ length: res.data.totalPage },
							(_, index) => index + 1,
						),
					);
				});
		} catch (error) {}
	};

	const handleOpenDialog = () => {
		const deleteItem = books.filter((c) => c.checked === true);
		if (deleteItem.length > 0) {
			setDialogOpen(true);
		}
	};
	const alertMessage = () => {
		const deleteItem = books.filter((c) => c.checked === true);
		let name = "";
		deleteItem.forEach((d) => (name += " [" + d.name + "] "));
		return name;
	};
	const onDeny = () => {
		setDialogOpen(false);
	};

	const handleDeleteItem = async () => {
		try {
			const deleteItem = books.filter((b) => b.checked === true);
			for (const book of deleteItem) {
				await axiosClient.delete(`/book/${book.id}`);
			}
			console.log("Delete successfully");
		} catch (error) {
			console.error("Lỗi khi xóa sách: ", error);
		}

		fetchData();
	};

	const handleChangePage = (e) => {
		console.log(e.target.value);
		setCurrentPage(e.target.value);
	};
	return (
		<div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
			<div className="col-span-3 bg-white shadow-lg rounded-lg my-4 p-4">
				<div className="shadow-md rounded-md h-full">
					<div className="mb-4 flex w-full justify-between items-center">
						<div className="text-3xl my-2">Book controll viewer</div>
						<div>
							<label htmlFor="">Số trang</label>
							<select
								onChange={handleChangePage}
								className="button mx-2"
							>
								<option value="-1">--</option>
								{page.map((p) => (
									<option key={p} value={p}>
										{p}
									</option>
								))}
							</select>
						</div>
					</div>
					<Table
						dataList={books}
						fieldList={field}
						isChecked={isChecked}
						onCheckboxChange={handleCheckboxChange}
						onItemSelected={handleSelectedItem}
					/>
				</div>
			</div>

			<div className="col-span-1 bg-white shadow-lg  rounded-lg my-4 p-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<Button
						classNames={
							"bg-red-500 px-3 py-2 rounded-md shadow-md outline-white text-white"
						}
						text={"Delete"}
						onClick={handleOpenDialog}
					/>

					<Button
						classNames={
							"bg-blue-500 px-3 py-2 rounded-md shadow-md outline-white text-white"
						}
						text={"Add and Edit"}
					/>
				</div>
			</div>

			<MDialog
				title={"Delete books?"}
				description={alertMessage() + "sẽ bị xóa"}
				onAccept={handleDeleteItem}
				onDeny={onDeny}
				onControl={{ dialogOpen, setDialogOpen }}
			/>
		</div>
	);
};

export default BookView;

/**
 * <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="p-4">
									<div className="flex items-center">
										<input
											id="checkbox-all-search"
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											htmlFor="checkbox-all-search"
											className="sr-only"
										>
											checkbox
										</label>
									</div>
								</th>
								<th scope="col" className="px-6 py-3">
									Book's name
								</th>
								<th scope="col" className="px-6 py-3">
									Image
								</th>
								<th scope="col" className="px-6 py-3">
									Category{" (s) "}
								</th>
								<th scope="col" className="px-6 py-3">
									Price
								</th>
								<th scope="col" className="px-6 py-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{books &&
								books.map((b) => (
									<tr
										key={b.id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<td className="w-4 p-4">
											<div className="flex items-center">
												<input
													id="checkbox-table-search-1"
													type="checkbox"
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
												/>
												<label
													htmlFor="checkbox-table-search-1"
													className="sr-only"
												>
													checkbox
												</label>
											</div>
										</td>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
										>
											{b.name}
										</th>
										<td className="px-6 py-4">
											<img
												src={`${
													import.meta.env.VITE_API_BASE_URL
												}import BookView from './BookView';
/api/Image/${b.image}`}
												className="w-auto h-[40px]"
											/>
										</td>
										<td className="px-6 py-4">
											{b.nameCategory.join(",")}
										</td>
										<td className="px-6 py-4">
											{currencyFormatter.format(b.newPrice)}
										</td>
										<td className="px-6 py-4 text-right">
											<a
												href="#"
												className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
											>
												Edit
											</a>
										</td>
									</tr>
								))}
						</tbody>
					</table>
 * 
 */
