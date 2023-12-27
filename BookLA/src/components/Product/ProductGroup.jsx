import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import ProductCardMin from "./ProductCardMin";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

const ProductGroup = ({ headingName, books }) => {
	const navigator = useNavigate();
	const [booksList, setBooksList] = useState();
	const [category, setCategory] = useState([]);
	useEffect(() => {}, []);
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
		<>
			<div>
				<Heading title={headingName} />

				<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-4 gap-4">
					{books.map((p, i) => (
						<ProductCardMin items={p} key={p.id} />
					))}
				</div>
			</div>
		</>
	);
};

export default ProductGroup;
