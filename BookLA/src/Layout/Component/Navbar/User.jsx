import { Popover, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { userSettingsMenu } from "../../../menuItemsData";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import MDialog from "../../../components/Dialog";
const user = {
	avatar:
		"https://imgs.search.brave.com/R826zZj0ZA7k8oi9gQdPvyZWjRb7TQDZJ1A_TbTxfls/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1UVXpOekk0/TlRnek5WNUJNbDVC/YW5CblhrRnRaVGd3/TlRZd016ZzNNakVA/LmpwZw",
};
const User = () => {
	const menuRef = useRef();
	const [menu, setMenu] = useState(userSettingsMenu);
	const [dialogOpen, setDialogOpen] = useState(false);
	const { token, setUser, user, setToken, setUserId } =
		useStateContext();
	const navigate = useNavigate();
	const handleLogout = () => {
		if (token) {
			setDialogOpen(true);
			setUser({});
			setToken("");
			setUserId("");
			navigate("/");
			localStorage.removeItem("ACCESS_TOKEN");
			localStorage.removeItem("USER_ID");
			setDialogOpen(false);
		}
	};

	const onDeny = () => {
		setDialogOpen(false);
	};
	useEffect(() => {
		if (!token) {
			setMenu([
				{
					title: "Khám phá",
					url: "/book/all",
					separate: false,
				},
				{
					title: "Đăng nhập",
					url: "/login",
					separate: false,
				},
				{
					title: "Đăng ký",
					url: "/signup",
					separate: true,
				},
			]);
		}
	}, [token]);
	return (
		<>
			<Popover>
				<Popover.Button className={"border-none outline-none"}>
					{token ? (
						<img
							className="w-10 h-10 rounded-full object-cover"
							src={
								user.avatar
									? `${import.meta.env.VITE_API_BASE_URL}/api/image/${
											user.avatar
									  }`
									: "./default-user.webp"
							}
							alt="user"
						/>
					) : (
						<>
							<UserCircleIcon className="w-10 h-10 font-thin dark:text-gray-200" />
						</>
					)}
				</Popover.Button>

				<Transition
					enter="transition-opacity duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Popover.Panel className={"relative"} ref={menuRef}>
						<ul className="rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 bg-clip-border  shadow-md absolute right-0 min-w-[250px] z-10">
							{menu.map((s, i) => (
								<li key={i} className="px-4 hover:opacity-80">
									<Link to={s.url} className="block py-3">
										{s.title}
									</Link>
								</li>
							))}
							{token && (
								<li className="px-4 hover:opacity-80">
									<button
										className="block py-3"
										onClick={() => setDialogOpen(true)}
									>
										Đăng xuất
									</button>
								</li>
							)}
						</ul>
					</Popover.Panel>
				</Transition>
			</Popover>
			<MDialog
				title={"Đăng xuất"}
				description={"Bạn có muốn đăng xuất?"}
				onAccept={handleLogout}
				onDeny={onDeny}
				onControl={{ dialogOpen, setDialogOpen }}
			/>
		</>
	);
};

export default User;
