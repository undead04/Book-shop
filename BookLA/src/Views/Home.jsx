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
	}, []);

	// const handleCheckOutStripe = async () => {
	// 	try {
	// 		const response = await axiosClient.post("/shopping/buy", [
	// 			{ id: 1, quantity: 10 },
	// 		]);
	// 		const { pubKey, sessionId } = response.data.data;

	// 		// Initialize Stripe
	// 		const stripe = await loadStripe(pubKey);

	// 		// Redirect to Checkout
	// 		const { error } = await stripe.redirectToCheckout({
	// 			sessionId: sessionId,
	// 		});

	// 		if (error) {
	// 			// Handle error
	// 			console.error(error.message);
	// 		}
	// 	} catch (error) {
	// 		// Handle axios or other errors
	// 		console.error("Error:", error);
	// 	}
	// };
	// const handleCheckOut = (e) => {
	// 	e.preventDefault();
	// };
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
				{}
			</div>
		</>
	);
};
