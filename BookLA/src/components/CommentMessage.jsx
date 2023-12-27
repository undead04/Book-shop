import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "./Button";
import axiosClient from "../axios-client";
import StarRating from "./StarRating";
import Rating from "./Rating";
import Input from "./Input";

const CommentMessage = ({ comment, bookId }) => {
	const [commentEdit, setCommentEdit] = useState(false);
	const [commentMessage, setCommentMessage] = useState("");
	const [rating, setRating] = useState(1);
	const handleEditComment = () => {
		setCommentEdit(true);
	};

	const handlePutComment = () => {
		axiosClient
			.put(
				`/comment`,
				JSON.stringify({
					bookId: bookId,
					userId: comment.userID,
					comment: commentMessage,
					star: rating,
				}),
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			)
			.then((res) => {
				toast("Thành công!");
			})
			.catch(() => {
				toast("Thất bại");
			});
		setCommentEdit(false);
	};

	useEffect(() => {
		setCommentMessage(comment.comment);
		setRating(comment.star);
	}, []);
	return (
		<>
			<div className="dark:bg-gray-900 bg-white dark:text-white text-black relative grid grid-cols-1 gap-4 p-4 mb-8 border dark:border-gray-400 rounded-lg shadow-lg">
				<div className="relative flex gap-4">
					<img
						src={
							comment.avatar
								? `${import.meta.env.VITE_API_BASE_URL}/api/image/${
										comment.avatar
								  }`
								: "./default-user.webp"
						}
						className="relative object-cover object-top rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
						alt="image"
						loading="lazy"
					/>
					<div className="flex flex-1 flex-col w-full">
						<div className="flex flex-row justify-between">
							<p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
								{comment.userName}
							</p>
							<a className="text-gray-500 text-xl" href="#">
								<i className="fa-solid fa-trash" />
							</a>
						</div>
						<div className=" text-gray-500">{comment.createAt}</div>
					</div>
				</div>
				<div>
					<div>
						{!commentEdit ? (
							<div>
								<Rating value={rating} show={false} />
								<p>{commentMessage}</p>
							</div>
						) : (
							<>
								<div className="mx-auto w-full">
									<StarRating
										setRatingParent={setRating}
										initalRate={rating}
									/>
								</div>
								<div className="flex gap-2 flex-shrink items-center justify-between mt-4">
									<div className="flex-1">
										<Input
											type="textarea"
											value={commentMessage}
											onchange={(e) =>
												setCommentMessage(e.target.value)
											}
											className="block w-full dark:bg-black border dark:border-white bg-white"
										/>
									</div>
								</div>
								<Button
									classNames={"button shadow-md bg-blue-500"}
									text={"Lưu"}
									onClick={handlePutComment}
								/>
							</>
						)}
					</div>
					<Button
						classNames={"text w-fit block ml-auto"}
						text={"Chỉnh sửa"}
						onClick={handleEditComment}
					/>
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default CommentMessage;
