import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../Layout/Component/Navbar";
import { ProductCard } from "../components/Product/ProductCard";
import ProductCardMin from "../components/Product/ProductCardMin";
import ProductGroup from "../components/Product/ProductGroup";
import axiosClient from "../axios-client";
import Button from "../components/Button";
import axios from "axios";

export const Home = () => {
	const [groupId, setGroupId] = useState([2, 3, 4]);
	const [books, setBooks] = useState([]);
	const [pub, setPub] = useState("");
	const [sessionId, setSessionId] = useState("");
	useEffect(() => {
		// Call api for trending book, hot sale, type, ... => Get the id
		axiosClient.get("/Book").then((res) => setBooks(res.data.data));
	}, []);

	const handleCheckOutStripe = async () => {
		try {
			const response = await axiosClient.post("/shopping/buy", [
				{ id: 1, quantity: 10 },
			]);
			const { pubKey, sessionId } = response.data.data;

			// Initialize Stripe
			const stripe = await loadStripe(pubKey);

			// Redirect to Checkout
			const { error } = await stripe.redirectToCheckout({
				sessionId: sessionId,
			});

			if (error) {
				// Handle error
				console.error(error.message);
			}
		} catch (error) {
			// Handle axios or other errors
			console.error("Error:", error);
		}
	};
	const handleCheckOut = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<div className="relative w-auto">
				{groupId.map((g, i) => (
					<ProductGroup id={g} key={i} />
				))}

				<Button text={"Check out"} onClick={handleCheckOut} />
				<Button
					text={"Check out with stripe"}
					onClick={handleCheckOutStripe}
				/>
			</div>
		</>
	);
};
