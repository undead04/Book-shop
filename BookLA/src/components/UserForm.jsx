import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AvatarUpload from "./AvatarUpload";
import { useStateContext } from "../Contexts/ContextProvider";

const UserForm = ({ user, controlForm }) => {
	const addressRef = useRef();
	const avatarRef = useRef();
	const phoneRef = useRef();
	const aboutRef = useRef();
	const { setUser } = useStateContext();
	const [userForm, setUserForm] = useState({});
	useEffect(() => {
		setUserForm(user);
	}, []);
	const reloadUser = () => {
		axiosClient
			.get(`/user/${user.id}`)
			.then((res) => setUser(res.data));
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const frmData = new FormData();
		frmData.append(
			"address",
			userForm.address ? userForm.address : user.address,
		);
		frmData.append(
			"avatar",
			avatarRef.current.files[0] ? avatarRef.current.files[0] : "",
		);
		frmData.append(
			"phone",
			userForm.phone ? userForm.phone : user.phone,
		);
		frmData.append(
			"about",
			userForm.about ? userForm.about : user.about,
		);
		controlForm[1](false);
		axiosClient.put(`/user/${user.id}`, frmData).then((res) => {
			reloadUser();
		});
	};

	return (
		<div className="w-2/3 h-2/3 overflow-scroll px-6 py-12 rounded-lg bg-white text-black">
			<div className="relative pb-24 text-xl">
				<div className="flex items-center justify-between">
					<div className="text-3xl">
						Thay đổi thông tin người dùng
					</div>
					<XMarkIcon
						className="w-6 h-6"
						onClick={() => controlForm[1](false)}
					/>
				</div>
				<form onSubmit={onSubmit}>
					<div className="py-4">
						<label className="block text-black" htmlFor="address">
							Avatar
						</label>
						<AvatarUpload
							ref={avatarRef}
							initialImage={user.avatar}
						/>
					</div>
					<div className="py-4">
						<label className="block text-black" htmlFor="address">
							Username
						</label>
						<input
							value={user.userName}
							disabled
							className="w-full text-black p-3 my-2 border"
							name="username"
							id="username"
						/>
					</div>
					<div className="py-4">
						<label className="block text-black" htmlFor="address">
							Số điện thoại
						</label>
						<input
							value={userForm.phone || ""}
							onChange={(e) =>
								setUserForm((prev) => ({
									...prev,
									phone: e.target.value,
								}))
							}
							className="w-full text-black p-3 my-2 border"
							name="phone"
							id="phone"
						/>
					</div>
					<div className="py-4">
						<label className="block text-black" htmlFor="address">
							Địa chỉ
						</label>
						<textarea
							value={userForm.address || ""}
							onChange={(e) =>
								setUserForm((prev) => ({
									...prev,
									address: e.target.value,
								}))
							}
							className="w-full text-black p-3 my-2 border"
							name="address"
							id="address"
							cols="30"
							rows="3"
						></textarea>
					</div>

					<div className="py-4">
						<label className="block text-black" htmlFor="address">
							Thông tin giới thiệu
						</label>
						<textarea
							value={userForm.about || ""}
							onChange={(e) =>
								setUserForm((prev) => ({
									...prev,
									about: e.target.value,
								}))
							}
							className="w-full text-black p-3 my-2 border"
							name="about"
							id="about"
							cols="30"
							rows="3"
						></textarea>
					</div>

					<Button
						text={"Lưu"}
						classNames={"button bg-blue-600 text-white"}
					/>
				</form>
			</div>
		</div>
	);
};

export default UserForm;
