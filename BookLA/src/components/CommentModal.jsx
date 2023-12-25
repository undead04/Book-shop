import { Dialog } from "@headlessui/react";
import React, { useRef, useState } from "react";
import Button from "./Button";
import StarRating from "./StarRating";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

const CommentModal = ({ bookId, isOpen, handleOpen }) => {
	const [rating, setRating] = useState(1);
	const { userId } = useStateContext();
	const commentRef = useRef();
	const onSubmit = (e) => {
		e.preventDefault();
		if (userId) {
			axiosClient
				.post("/comment", {
					bookId: bookId,
					userId: userId,
					comment: commentRef.current.value,
					star: rating,
				})
				.then((res) => {
					console.log(res);
				});
		}
	};
	return (
		<Dialog
			as={"div"}
			open={isOpen}
			onClose={() => handleOpen(false)}
			className={"fixed inset-0 flex items-center justify-center"}
		>
			<Dialog.Panel>
				<div className="py-3 sm:max-w-xl sm:mx-auto">
					<div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
						<div className="px-12 py-5">
							<h2 className="text-gray-800 text-3xl font-semibold">
								Your opinion matters to us!
							</h2>
						</div>
						<div className="bg-gray-200 w-full flex flex-col items-center">
							<div className="flex flex-col items-center py-6 space-y-3">
								<span className="text-lg text-gray-800">
									Rating Books and shopping experiences?
								</span>
								<StarRating setRatingParent={setRating} />
							</div>
							<div className="w-3/4 flex flex-col">
								<textarea
									ref={commentRef}
									rows={3}
									className="p-4 text-gray-500 rounded-xl resize-none"
									defaultValue={"Leave a message, if you want"}
								/>
								<Button
									onClick={onSubmit}
									text={"Rate now"}
									classNames="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
								/>
							</div>
						</div>
						<div className="h-20 flex items-center justify-center">
							<Button
								onClick={() => handleOpen(false)}
								className="text-gray-600"
								text={"Maybe later"}
							/>
						</div>
					</div>
					<div className="mt-8 text-gray-700">
						Crédits{" "}
						<a
							className="font-bold"
							href="https://dribbble.com/shots/12052834-Rating-popup"
						>
							Goga
						</a>
					</div>
				</div>
			</Dialog.Panel>
		</Dialog>
	);
};

export default CommentModal;
