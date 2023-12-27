import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../Layout/Component/Navbar";
import { ProductCard } from "../components/Product/ProductCard";
import ProductCardMin from "../components/Product/ProductCardMin";
import ProductGroup from "../components/Product/ProductGroup";
import axiosClient from "../axios-client";
import Button from "../components/Button";
import axios from "axios";
import { useStateContext } from "../Contexts/ContextProvider";

export const Home = () => {
	const [groupId, setGroupId] = useState();
	const [books, setBooks] = useState([]);
	const [topSellerBook, setTopSellerBook] = useState([]);
	const [topSaleOff, setTopSaleOff] = useState([]);
	const [pub, setPub] = useState("");
	const [sessionId, setSessionId] = useState("");
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		// axiosClient.get("/Book").then((res) => setBooks(res.data));
		axiosClient
			.get("/filter?sortby=best-seller&page=1&take=4")
			.then((res) => {
				setTopSellerBook(res.data.book);
			});
		axiosClient
			.get("/filter?sortby=sale-price&page=1&take=4")
			.then((res) => {
				setTopSaleOff(res.data.book);
			});

		axiosClient
			.get("/Filter?categoryId=2&page=1&take=4")
			.then((res) => {
				setBooks(res.data.book);
			});
	}, []);

	return (
		<>
			<div className="relative w-auto">
				{topSellerBook && (
					<ProductGroup
						headingName={"Top seller"}
						books={topSellerBook}
					/>
				)}
				{topSaleOff && (
					<ProductGroup
						headingName={"Top saleoff"}
						books={topSaleOff}
					/>
				)}

				{books && (
					<ProductGroup headingName={"New release"} books={books} />
				)}
				{}
			</div>
		</>
	);
};
