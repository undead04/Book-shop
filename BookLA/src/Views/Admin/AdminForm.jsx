import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/Input";
import axiosClient from "../../axios-client";
import { Menu } from "@headlessui/react";
import ImageUpload from "../../components/ImageUpload";
import Button from "../../components/Button";
import DatePicker from "../../components/DatePicker";

const AdminForm = () => {
	const [book, setBook] = useState({
		author: "",
		description: "",
		id: "",
		image: "",
		name: "",
		nameCategory: "",
		newPrice: "",
		oldPrice: "",
		publisher: "",
		quantity: "",
		secondaryImage: [],
		series: "",
		supplier: "",
		totalStar: "",
		create_at: "",
	});
	const [bookId, setBookId] = useState(-1);
	const [category, setCategory] = useState([]);
	const { id } = useParams();
	const navigator = useNavigate();
	const [typOpen, setTypOpen] = useState(false);
	const [dateTime, setDateTime] = useState("00/00/0000 00:00:00");
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [subImages, setSubImages] = useState([]);
	const subImgsRef = useRef();
	const imageRef = useRef();

	const handleChangeDate = (date) => {
		setDateTime(date);
	};
	useEffect(() => {
		// if (isNaN(id)) {
		// 	navigator("/404");
		// }

		// Hàm để biến đổi đối tượng Date thành chuỗi thời gian theo định dạng "MM/DD/YYYY HH:mm:ss"

		fetchData();
	}, []);
	const fetchData = () => {
		axiosClient.get("/category").then((res) => {
			setCategory(res.data.categorys);
		});

		fetchBook();
	};

	const fetchBook = () => {
		if (!isNaN(+id)) {
			setBookId(+id);
			axiosClient.get(`/book/${id}`).then((res) => {
				setBook(res.data);
				category.map((c) => {
					if (res.data.nameCategory.includes(c.name)) {
						setSelectedTypes((prev) => [...prev, c.id]);
					}
				});
			});
		}
	};

	const handleCheckboxChange = (id) => {
		if (selectedTypes.includes(id)) {
			var newTypes = selectedTypes.filter((s) => s !== id);
			setSelectedTypes(newTypes);
		} else {
			setSelectedTypes((prev) => [...prev, id]);
		}
	};

	const handleAddBook = (e) => {
		e.preventDefault();
		const frmData = new FormData();
		frmData.append("name", book.name);
		frmData.append("supplier", book.supplier);
		frmData.append("publisher", book.publisher);
		frmData.append("oldPrice", book.oldPrice);
		frmData.append("newPrice", book.newPrice);
		selectedTypes.map((s) => {
			frmData.append("categoryID", s);
		});
		frmData.append("quantity", book.quantity);
		frmData.append("author", book.author);
		frmData.append("image", imageRef.current.files[0] || null);
		subImages.map((s) => {
			frmData.append("secondaryImage", s.file);
		});

		frmData.append("description", book.description);
		frmData.append("seriesID", "");
		frmData.append("create", dateTime);
		if (id) {
			axiosClient.put(`/book/${id}`, frmData).then((res) => {
				if (res.errorCode == 400) {
					toast(
						"Đã xảy ra lỗi, đảm bảo các trường không trống và thử lại",
					);
				} else {
					toast("Sửa sản phẩm thành công!");
					setTimeout(() => {
						navigator("/admin/books/all");
					}, 5000);
				}
			});
		} else {
			axiosClient.post("/book", frmData).then((res) => {
				if (res.errorCode == 400) {
					toast(
						"Đã xảy ra lỗi, đảm bảo các trường không trống và thử lại",
					);
				} else {
					toast("Thêm sản phẩm thành công!");
					setTimeout(() => {
						navigator("/admin/books/all");
					}, 5000);
				}
			});
		}
	};

	return (
		<div>
			<ToastContainer />
			<div className="grid grid-cols-3 p-4 gap-4 h-auto">
				<div className="col-span-2 panel">
					<h2 className="text-3xl font-medium">
						{id ? "Edit book" : "Add book"}
					</h2>
					<form>
						<Input
							title={"Name"}
							value={book.name}
							onchange={(e) =>
								setBook((prev) => ({ ...prev, name: e.target.value }))
							}
						/>

						<Menu>
							<Menu.Button
								className={"button my-2 font-thin"}
								onClick={() => {
									setTypOpen((prev) => !prev);
									if (book.name) {
										category.map((c) => {
											if (book.nameCategory.includes(c.name)) {
												setSelectedTypes((prev) => [...prev, c.id]);
											}
										});
									}
								}}
							>
								Chọn thể loại
							</Menu.Button>
							{typOpen && (
								<div>
									<Menu.Items static className={"grid grid-cols-3"}>
										{category.map((c) => (
											<Menu.Item key={c.name}>
												<div className="px-2 py-1">
													<input
														type="checkbox"
														name="typ_id[]"
														value={c.id}
														onChange={() =>
															handleCheckboxChange(c.id)
														}
														className="mx-2"
														checked={
															selectedTypes.includes(c.id) || false
														}
													/>
													{c.name}
												</div>
											</Menu.Item>
										))}
									</Menu.Items>
								</div>
							)}
						</Menu>
						<Input
							value={book.author}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									author: e.target.value,
								}))
							}
							title="Author"
						/>
						<Input
							value={book.publisher}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									publisher: e.target.value,
								}))
							}
							title="Publisher"
						/>
						<Input
							value={book.supplier}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									supplier: e.target.value,
								}))
							}
							title="Supplier"
						/>
						<Input
							value={book.newPrice}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									newPrice: e.target.value,
								}))
							}
							title="New Price"
						/>
						<Input
							value={book.oldPrice}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									oldPrice: e.target.value,
								}))
							}
							title="Old Price"
						/>
						<Input
							value={book.quantity}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									quantity: e.target.value,
								}))
							}
							title="Quantity"
						/>
						<label htmlFor="" className="label">
							Ngày viết
						</label>
						<DatePicker handleGetDateTime={handleChangeDate} />
						<Input
							value={book.description}
							onchange={(e) =>
								setBook((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							type="textarea"
							title="Description"
						/>
					</form>
				</div>

				<div className="panel">
					<div className="flex flex-col justify-between h-full">
						<div className="flex-1">
							<Input
								ref={imageRef}
								onchange={(e) =>
									setBook((prev) => ({
										...prev,
										image: e.target.files[0],
									}))
								}
								type={"file"}
							/>
							<ImageUpload
								onImagesChange={[subImages, setSubImages]}
								ref={subImgsRef}
								title={"Sub Images"}
							/>

							<div>
								<Button
									classNames={
										"button bg-blue-500 text-white w-fit block ml-auto"
									}
									text={"Lưu"}
									onClick={handleAddBook}
								/>
							</div>
						</div>

						{id && (
							<>
								<div className="">
									<div className="text-2xl font-semibold mb-2">
										Old image
									</div>
									<div className="text-xl font-medium mb-2">
										Main image
									</div>
									<div className="w-fit mx-auto border px-2 my-2">
										<img
											src={`${
												import.meta.env.VITE_API_BASE_URL
											}/api/Image/${decodeURIComponent(book.image)}`}
											alt="Main image"
											className="object-cover w-2/3 mx-auto"
										/>
									</div>
									<div className="text-xl font-medium my-2">
										Main image
									</div>
									<div className="grid grid-cols-3">
										{book.secondaryImage.map((i) => (
											<div key={i} className="border  p-2">
												<img
													className="object-cover"
													src={`${
														import.meta.env.VITE_API_BASE_URL
													}/api/Image/${i}`}
													alt="subImage"
												/>
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminForm;
