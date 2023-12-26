import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "../Rating";
import axiosClient from "../../axios-client";
import { currencyFormatter } from "../../util/currencyFormatter";
import ProductDetailLoader from "./ProductDetailLoader";
import Heading from "../Heading";
import ProductCardMin from "./ProductCardMin";
import ProductGroup from "./ProductGroup";
import { useStateContext } from "../../Contexts/ContextProvider";
import RatingView from "../RatingView";
import Button from "../Button";
import CommentMessage from "../CommentMessage";
import CommentModal from "../CommentModal";
import BuyingForm from "../BuyingForm";

const test = {
	name: "The Catcher in the Rye",
	description:
		"Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.",
	price: 58,
	image: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
	rating: "4",
	subImage: [
		"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
		"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
		"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
	],
};

const ProductDetail = () => {
	const { id } = useParams();
	const navigator = useNavigate();
	const [book, setBook] = useState({});
	const [loading, setLoading] = useState(true);
	const [openRating, setOpenRating] = useState(false);
	const [openBuyForm, setOpenBuyForm] = useState(false);
	const [comments, setComments] = useState([]);
	const [category, setCategory] = useState([]);
	const [proArray, setProArray] = useState([]);
	const { userId, token } = useStateContext();
	const openBuyFormControl = [openBuyForm, setOpenBuyForm];
	const [notify, setNotify] = useState({
		isNotify: false,
		message: "",
	});
	const [canComment, setCanComment] = useState(false);
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		notification();
	}, [notify.isNotify]);

	const notification = () => {
		if (notify.isNotify && notify.message) {
			toast(notify.message);
		}
		setNotify({
			isNotify: false,
			message: "",
		});
	};

	const checkCanComment = () => {
		if (userId && token) {
			axiosClient
				.get(`/Comment/isComment/${id}/${userId}`)
				.then((res) => {
					setCanComment(res.data);
				});
		} else {
			setCanComment(false);
		}
	};

	const fetchData = () => {
		if (isNaN(id)) {
			navigator("/404");
		} else {
			checkCanComment();
			axiosClient.get(`/Book/${id}`).then((res) => {
				setLoading(true);
				axiosClient.get("/category").then(async (response) => {
					const cate = response.data.categorys.filter((d) =>
						res.data.nameCategory.includes(d.name),
					);

					const promise = cate.map((c) =>
						axiosClient.get(
							`/filter?categoryId=${c.id}&page=1&take=4`,
						),
					);
					const result = await Promise.all(promise);
					const newArray = result.map((r) => [...r.data.book]);
					setProArray(newArray);

					setCategory(
						response.data.categorys.filter((d) =>
							res.data.nameCategory.includes(d.name),
						),
					);
				});
				setBook(res.data);
				setLoading(false);
			});

			axiosClient.get(`/comment/bookID/${id}`).then((res) => {
				setComments(res.data);
			});
		}
	};

	const handleBuyNow = (e) => {
		e.preventDefault();
		setOpenBuyForm(true);
	};

	return (
		<>
			{loading ? (
				<>
					<ProductDetailLoader />
				</>
			) : (
				<>
					<section className="text-gray-700 bg-white dark:text-white dark:bg-gray-900 body-font overflow-hidden">
						<ToastContainer />
						<div className="container px-5 py-12 mx-auto">
							<div className="lg:w-4/5 mx-auto flex flex-wrap">
								<img
									alt="image"
									className="lg:w-1/2 w-full object-cover object-center rounded border border-slate-300 dark:border-slate-600"
									src={`${
										import.meta.env.VITE_API_BASE_URL
									}/api/Image/${book.image}`}
								/>
								<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
									<h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
										{book.publisher}
									</h2>
									<h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
										{book.name}
									</h1>
									<div className="flex mb-4">
										{book.totalStar != "0" && (
											<Rating value={book.totalStar} />
										)}
									</div>
									<p className="leading-relaxed">
										{book.description}
									</p>
									<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
									<div className="flex">
										<span className="title-font font-medium text-2xl dark:text-white text-gray-900">
											{currencyFormatter.format(book.newPrice)}
										</span>

										<span className="ml-4 text-sm title-font font-medium  dark:text-white text-gray-900 line-through">
											{currencyFormatter.format(book.oldPrice)}
										</span>
										<div className="flex items-center gap-4 ml-auto">
											<button className="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
												Add to cart
											</button>
											<button
												onClick={handleBuyNow}
												className="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
											>
												Buy now
											</button>
										</div>
									</div>
									<div className="flex items-center mt-4 pt-2 border dark:border-white w-full overflow-x-scroll">
										{book.secondaryImage &&
											book.secondaryImage.map((p, i) => (
												<img
													key={i}
													alt="image"
													src={`${
														import.meta.env.VITE_API_BASE_URL
													}/api/Image/${p}`}
													className="w-24 dark:border-white mx-2"
												/>
											))}
									</div>
								</div>
							</div>

							{/* Product detail */}
							<div>
								<span className="text-3xl font-semibold block my-3">
									Thông tin chi tiết
								</span>
								<table className="table">
									<thead className="table-head">
										<tr>
											<th colSpan={2} className="px-6 py-4">
												Thông tin
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="table-row">
											<td className="px-6 py-4">Tên</td>
											<td className="px-6 py-4">{book.name}</td>
										</tr>
										<tr className="table-row">
											<td className="px-6 py-4">Số lượng</td>
											<td className="px-6 py-4">{book.quantity}</td>
										</tr>
										<tr className="table-row">
											<td className="px-6 py-4">Tác giả</td>
											<td className="px-6 py-4">{book.author}</td>
										</tr>
										<tr className="table-row">
											<td className="px-6 py-4">Nhà xuất bản</td>
											<td className="px-6 py-4">{book.publisher}</td>
										</tr>
										<tr className="table-row">
											<td className="px-6 py-4">Nhà cung cấp</td>
											<td className="px-6 py-4">{book.supplier}</td>
										</tr>
										<tr className="table-row">
											<td className="px-6 py-4">Thể loại</td>
											<td className="px-6 py-4">
												{book.nameCategory.join(", ")}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div>
								<span className="text-3xl font-semibold block my-3">
									Đánh giá sản phẩm
								</span>
							</div>
							<div className="px-3">
								<RatingView bookId={id} />
								<div className="flex gap-4 my-3 w-fit ml-auto">
									<Button
										text={"Viết đánh giá"}
										classNames={`button bg-blue-500 ${
											canComment ? "" : "hidden text-red-500"
										}`}
										disabled={!canComment}
										onClick={() => setOpenRating(true)}
									/>
								</div>
								<div>
									{comments.map((c) => (
										<div className="w-3/5 mx-auto">
											<CommentMessage comment={c} />
										</div>
									))}
								</div>
							</div>
							{openRating && (
								<div
									style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
									className="fixed inset-0  flex items-center justify-center"
								>
									<CommentModal
										bookId={id}
										handleOpen={setOpenRating}
										isOpen={openRating}
									/>
								</div>
							)}

							{openBuyForm && (
								<>
									<div
										className="fixed inset-0 flex items-center justify-center"
										style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
									>
										<BuyingForm
											book={book}
											controlOpen={openBuyFormControl}
											setNotify={setNotify}
										/>
									</div>
								</>
							)}
						</div>
					</section>
				</>
			)}
		</>
	);
};

export default ProductDetail;
