import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductCardMin from "../components/Product/ProductCardMin";

const products = [];
const Products = () => {
	const [books, setBooks] = useState([]);

	const _setBooks = (data) => {
		setBooks(data);
	};
	useEffect(() => {
		// call api to all the product
	}, []);
	return (
		<div className="mt-8 container">
			<Filter setPassData={_setBooks} />

			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mt-4 py-2">
				{books.map((b) => (
					<ProductCardMin items={b} key={b.id} />
				))}
			</div>
		</div>
	);
};

export default Products;
