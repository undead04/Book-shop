import React from "react";

const CartItem = ({ product, quantity }) => {
	return (
		<div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
			<div className="w-full md:w-40">
				<img
					className="w-full hidden md:block"
					src={product.image}
					alt="product"
				/>
				<img
					className="w-full md:hidden"
					src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png"
					alt="dress"
				/>
			</div>
			<div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
				<div className="w-full flex flex-col justify-start items-start space-y-8">
					<h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
						{product.name}
					</h3>
					<div className="flex justify-start items-start flex-col space-y-2">
						<p className="text-sm dark:text-white leading-none text-gray-800">
							<span className="dark:text-gray-400 text-gray-300">
								Publisher:{" "}
							</span>{" "}
							Italic Minimal Design
						</p>
						<p className="text-sm dark:text-white leading-none text-gray-800">
							<span className="dark:text-gray-400 text-gray-300">
								Size:{" "}
							</span>{" "}
							Small
						</p>
						<p className="text-sm dark:text-white leading-none text-gray-800">
							<span className="dark:text-gray-400 text-gray-300">
								Color:{" "}
							</span>{" "}
							Light Blue
						</p>
					</div>
				</div>
				<div className="flex justify-between space-x-8 items-start w-full">
					<p className="text-base dark:text-white xl:text-lg leading-6">
						${product.price}{" "}
						<span className="text-red-300 line-through">
							{" "}
							30.00 {product.oldPrice}
						</span>
					</p>
					<p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
						<div className="flex items-center">
							<button>
								<MinusCircleIcon className="w-6 h-6 text-white" />
							</button>
							<input type="number" className="w-8 text-black mx-2" />
							<button>
								<PlusCircleIcon className="w-6 h-6 text-white" />
							</button>
						</div>
					</p>
					<p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
						${product.price * quantity}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
