import { Popover, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { userSettingsMenu } from "../../../menuItemsData";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";
const user = {
	avatar:
		"https://imgs.search.brave.com/R826zZj0ZA7k8oi9gQdPvyZWjRb7TQDZJ1A_TbTxfls/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1UVXpOekk0/TlRnek5WNUJNbDVC/YW5CblhrRnRaVGd3/TlRZd016ZzNNakVA/LmpwZw",
};
const User = () => {
	const menuRef = useRef();
	const [menu, setMenu] = useState(userSettingsMenu);

	const { token } = useStateContext();

	useEffect(() => {
		if (!token) {
			setMenu([
				{
					title: "Đăng nhập",
					url: "/login",
					icons: "fa fa-user",
					separate: false,
				},
				{
					title: "Đăng ký",
					url: "/signup",
					icons: "fa fa-user",
					separate: true,
				},
			]);
		}
	}, [token]);
	return (
		<Popover>
			<Popover.Button className={"border-none outline-none"}>
				{token ? (
					<img
						className="w-10 h-10 rounded-full"
						src={user.avatar}
						alt="user"
					/>
				) : (
					<>
						<UserCircleIcon className="w-10 h-10 font-thin" />
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
					<ul className="rounded-xl bg-white bg-clip-border text-gray-700 shadow-md absolute right-0 min-w-[250px] z-10">
						{menu.map((s, i) => (
							<li key={i} className="px-4">
								<Link to={s.url} className="block py-3">
									{s.title}
								</Link>
							</li>
						))}
					</ul>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default User;
