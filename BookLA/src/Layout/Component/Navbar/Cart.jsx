import { Popover, Transition } from "@headlessui/react";
import React from "react";
import Cartsm from "../../../components/Cart/Cartsm";
const carts = [
	{
		name: "Samsung Galaxy Note 4",
		price: "2,890.66",
	},
	{
		name: "Logitech Keyboard",
		price: "120.50",
	},
];
const Cart = () => {
	return (
		<div>
			<Popover>
				<Popover.Button className={"border-none outline-none"}>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
					</span>
				</Popover.Button>

				<Transition
					className={"z-10"}
					enter="transition-opacity duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Popover.Panel className={"relative"}>
						<div className="absolute right-0 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md z-10">
							<Cartsm items={carts} />
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	);
};

export default Cart;
