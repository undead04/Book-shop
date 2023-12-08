import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import ProductCardMin from "./ProductCardMin";
import FancyButton from "../FancyButton";

const ProductGroup = ({ id }) => {
	const [grpProduct, setGrpProduct] = useState({
		name: "Hot sales",
		products: [
			{
				name: "Ipad",
				price: "1000",
				image:
					"https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp",
				rating: 2,
			},
			{
				name: "Ipad",
				price: "1000",
				image:
					"https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp",
				rating: 4,
			},
			{
				name: "Ipad",
				price: "1000",
				image:
					"https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp",
				rating: 5,
			},
			{
				name: "Ipad",
				price: "1000",
				image:
					"https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp",
				rating: 1,
			},
		],
	});
	useEffect(() => {
		// Call the api for the id given,
		// get the name and the product into it;
	}, []);
	return (
		<div>
			<Heading title={grpProduct.name} />
			<div className="flex justify-end">
				<div className="">
					<FancyButton to={"#"} title={"View more"} />
				</div>
			</div>
			<div className="grid grid-cols-4 py-4 gap-4">
				{grpProduct.products.map((p, i) => (
					<ProductCardMin items={p} key={i} />
				))}
			</div>
		</div>
	);
};

export default ProductGroup;
