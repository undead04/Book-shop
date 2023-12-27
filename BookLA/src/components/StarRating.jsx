import React, { useEffect, useState } from "react";

const StarRating = ({ setRatingParent, initalRate = 1 }) => {
	const [rating, setRating] = useState(1);
	useEffect(() => {
		setRating(initalRate);
	}, []);
	const handleStarClick = (selectedRating) => {
		setRating(selectedRating);
		setRatingParent(selectedRating);
	};

	const getRatingText = () => {
		let ratingMessage = "Worst";
		switch (rating) {
			case 1:
				ratingMessage = "Worst";
				break;
			case 2:
				ratingMessage = "Bad";
				break;
			case 3:
				ratingMessage = "Medium";
				break;
			case 4:
				ratingMessage = "Good";
				break;

			case 5:
				ratingMessage = "Very Good!";
				break;

			default:
				break;
		}
		return ratingMessage;
	};
	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<span
					key={i}
					className={`block ${i <= rating ? "filled" : ""}`}
					onClick={() => handleStarClick(i)}
				>
					<svg
						className={`w-12 h-12 text-yellow-500`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill={` ${i <= rating ? "currentColor" : "white"}`}
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
				</span>,
			);
		}
		return stars;
	};

	return (
		<div className="star-rating">
			<div className="flex justify-center w-full">
				{renderStars()}
			</div>
			<div className="text-center">{getRatingText()}</div>
		</div>
	);
};

export default StarRating;
