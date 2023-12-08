import React, { useEffect, useRef, useState } from "react";
import {
	Disclosure,
	Menu,
	Popover,
	Transition,
} from "@headlessui/react";
import {
	Bars3Icon,
	BellIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

import { Fragment } from "react";
import Input from "../../components/Search";
import { menuItemsData, userSettingsMenu } from "../../menuItemsData";
import MenuItems from "../../components/MenuItems";
import { Mypopover } from "../../components/MyPopover";
import Cartsm from "../../components/Cart/Cartsm";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import Brand from "./Navbar/Brand";
import Cart from "./Navbar/Cart";
import User from "./Navbar/User";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

const Navbar = () => {
	const [isShowing, setIsShowing] = useState(false);

	useEffect(() => {
		const handlerClose = (e) => {
			if (
				isShowing &&
				menuRef.current &&
				!menuRef.current.contains(e.target)
			) {
				setIsShowing(false);
			}
			document.addEventListener("mousedown", handlerClose);
			document.addEventListener("touchstart", handlerClose);
			return () => {
				// Cleanup the event listener
				document.removeEventListener("mousedown", handlerClose);
				document.removeEventListener("touchstart", handlerClose);
			};
		};
	}, [isShowing]);

	return (
		<nav className="lg:px-16 px-6 bg-white shadow-md flex items-center justify-between lg:py-2 py-4">
			<Brand />
			<Search placeholder="Search for books.." />
			<div className="flex lg:justify-endd items-center relative pr-2">
				<Cart />
				<div className="ml-4"></div>
				<User />
			</div>
		</nav>
	);
};

export default Navbar;
