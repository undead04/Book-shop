import React from "react";

const CommentMessage = ({ comment }) => {
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
				<p>{comment.comment}</p>
			</div>
		</>
	);
};

export default CommentMessage;
