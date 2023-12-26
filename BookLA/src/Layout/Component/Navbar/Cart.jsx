import { Popover, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Cartsm from "../../../components/Cart/Cartsm";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
const Cart = () => {
	const [carts, setCarts] = useState([]);
	useEffect(() => {}, [carts]);

	const getCart = async () => {
		const cart = await JSON.parse(localStorage.getItem("cart"));
		setCarts(cart);
	};
	return (
		<div>
			<Popover>
				<Popover.Button
					onClick={getCart}
					className={"border-none outline-none"}
				>
					<span>
						<ShoppingCartIcon className="w-8 h-8 dark:text-gray-200" />
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
						<div className="absolute right-0 rounded-xl bg-white dark:bg-gray-800 dark:text-gray-200 bg-clip-border text-gray-700 shadow-md z-10">
							<Cartsm items={carts} />
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	);
};

export default Cart;
