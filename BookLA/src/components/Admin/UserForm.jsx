import {
	MapIcon,
	PhoneIcon,
	QuestionMarkCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const UserForm = ({ user, handleClose }) => {
	return (
		<div className="relative bg-white rounded overflow-hidden shadow-lg min-w-[450px]">
			<div className="absolute top-4 right-4">
				<button
					className="button bg-white text-black"
					onClick={() => handleClose()}
				>
					<XMarkIcon className="w-4 h-4" />
				</button>
			</div>
			<div className="text-center p-6 bg-gray-800 border-b">
				<img
					src={
						user.avatar
							? `${import.meta.env.VITE_API_BASE_URL}/api/image/${
									user.avatar
							  }`
							: "/default-user.webp"
					}
					className="h-24 w-24 text-white rounded-full mx-auto"
					alt=""
				/>
				<p className="pt-2 text-lg font-semibold text-gray-50">
					{user.userName}
				</p>
				<p className="text-sm text-gray-100">{user.email}</p>
			</div>
			<div className="border-b">
				<div className="px-4 py-2 hover:bg-gray-100 flex items-center">
					<PhoneIcon className="w-4 h-4 text-green-500" />
					<div className="pl-3">
						<p className="text-sm font-medium text-gray-800 leading-none">
							Phone:
						</p>
						<p className="text-xs text-gray-500">{user.phone}</p>
					</div>
				</div>

				<div className="px-4 py-2 hover:bg-gray-100 flex items-center">
					<MapIcon className="w-4 h-4 text-blue-500" />
					<div className="pl-3">
						<p className="text-sm font-medium text-gray-800 leading-none">
							Address
						</p>
						<p className="text-xs text-gray-500">{user.address}</p>
					</div>
				</div>

				<div className="px-4 py-2 hover:bg-gray-100 flex items-center">
					<QuestionMarkCircleIcon className="w-4 h-4 text-red-500" />
					<div className="pl-3">
						<p className="text-sm font-medium text-gray-800 leading-none">
							About
						</p>
						<p className="text-xs text-gray-500">{user.about}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserForm;
