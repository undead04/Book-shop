import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Admin/Table";
import axiosClient from "../../axios-client";
import Button from "../../components/Button";
import MDialog from "../../components/Dialog";
import Input from "../../components/Input";
import { Dialog, Transition } from "@headlessui/react";

const CategoryForm = () => {
	const [cateList, setCateList] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formOpen, setFormOpen] = useState(false);
	const [error, setError] = useState("");
	const selectRef = useRef();
	const formTextRef = useRef();
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		console.log("fetch");
		try {
			axiosClient.get("/category").then((res) => {
				setCateList(res.data.map((d) => ({ ...d, checked: false })));
			});
		} catch (error) {}
	};
	const fieldList = [
		{
			type: "checkbox",
			keyName: "name",
		},
		{
			type: "text",
			fieldName: "ID",
			keyName: "id",
		},
		{
			type: "text",
			fieldName: "Category's name",
			keyName: "name",
		},
	];

	const handleCheckboxChange = (newState) => {
		setIsChecked(newState);

		if (newState) {
			if (
				cateList.find((c) => c.checked === false) ||
				!isSelectedAll
			) {
				setCateList((prev) =>
					prev.map((p) => ({ ...p, checked: true })),
				);
			}
			setIsSelectedAll(true);
		}

		if (isSelectedAll) {
			setCateList((prev) =>
				prev.map((p) => ({ ...p, checked: false })),
			);
			setIsSelectedAll(false);
		}
	};

	const handleSelectedItem = (id) => {
		setCateList((prev) =>
			prev.map((p) => {
				if (p.id === +id) {
					if (p.checked == true) {
						setIsChecked(false);
						setIsSelectedAll(false);
					} else {
					}
					return { ...p, checked: !p.checked };
				}
				return p;
			}),
		);
	};

	const handleDeleteItem = async () => {
		try {
			const deleteItem = cateList.filter((i) => i.checked === true);
			for (const item of deleteItem) {
				await axiosClient.delete(`/category/${item.id}`);
			}
			console.log("Delete successfully");
		} catch (error) {
			console.error("Lỗi khi xóa thể loại: ", error);
		}
		fetchData();
	};

	const handleOpenDialog = () => {
		const deleteItem = cateList.filter((c) => c.checked === true);
		if (deleteItem.length > 0) {
			console.log(deleteItem);
			setDialogOpen(true);
		}
	};
	const alertMessage = () => {
		const deleteItem = cateList.filter((c) => c.checked === true);
		let name = "";
		deleteItem.forEach((d) => (name += " [" + d.name + "] "));
		return name;
	};

	const onDeny = () => {
		setDialogOpen(false);
	};

	const handleEditItem = (e) => {
		e.preventDefault();
		setError("");
		let num = selectRef.current.value;
		const data = {
			name: formTextRef.current.value,
		};
		if (!isNaN(+num) && +num !== -1) {
			axiosClient
				.put(`/category/${num}`, JSON.stringify(data), {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					if (res.errorCode === 400) {
						setError(res.message.Name);
					}
					fetchData();
				});
		} else {
			console.log(num);
			if (+num === -1) {
				axiosClient
					.post("/category", JSON.stringify(data), {
						headers: {
							"Content-Type": "application/json",
						},
					})
					.then((res) => {
						if (res.errorCode === 400) {
							setError(res.message.Name);
						}
						fetchData();
						console.log(res);
					});
			}
		}
	};
	return (
		<div className="relative grid lg:grid-cols-4 grid-cols-1 gap-4">
			<div className="col-span-3 bg-white shadow-lg rounded-lg my-4 p-4 h-auto">
				<div className="shadow-md round  h-full">
					<h4 className="text-3xl my-2">Category controll viewer</h4>
					{cateList && (
						<Table
							fieldList={fieldList}
							dataList={cateList}
							isChecked={isChecked}
							onCheckboxChange={handleCheckboxChange}
							onItemSelected={handleSelectedItem}
						/>
					)}
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
						onClick={() => setFormOpen(true)}
					/>

					<Transition
						show={formOpen}
						enter="transition-opacity duration-400"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity duration-400"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Transition.Child>
							<Dialog
								static
								open={formOpen}
								onClose={() => setFormOpen(false)}
							>
								<Dialog.Panel
									className={"fixed right-10 top-40 w-[400px] z-20"}
								>
									<div className="">
										<div className="panel ">
											<h4 className="text-2xl font-semibold my-2">
												Create or edit Category
											</h4>
											<Input
												title={"Name"}
												type="text"
												ref={formTextRef}
												error={error}
											/>
											<div className="mt-2">
												<label htmlFor="">
													Select your options (Choose Add New or Id to
													Edit)
												</label>
												<select
													className="border px-3 py-2 mt-2 text-lg"
													ref={selectRef}
												>
													<option value="-1">Add new</option>
													{cateList.map((c) => (
														<option value={c.id} key={c.id}>
															{c.id}
														</option>
													))}
												</select>
											</div>
											<Button
												text={"Submit"}
												classNames={
													"button bg-green-500 text-white block w-fit ml-auto"
												}
												onClick={handleEditItem}
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Dialog>
						</Transition.Child>
					</Transition>
				</div>
			</div>

			<MDialog
				title={"Delete category?"}
				description={alertMessage() + "sẽ bị xóa"}
				onAccept={handleDeleteItem}
				onDeny={onDeny}
				onControl={{ dialogOpen, setDialogOpen }}
			/>
		</div>
	);
};

export default CategoryForm;
