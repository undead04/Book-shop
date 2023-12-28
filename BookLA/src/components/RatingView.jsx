import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import axiosClient from "../axios-client";

const RatingView = ({ bookId = -1, star = 1 }) => {
	const [ratingData, setRatingData] = useState([]);
	const [amountComment, setAmountComment] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	const getPercent = (star) => {
		return (amountComment[star - 1] / ratingData.length) * 100 + "%";
		// return amountComment[star - 1];
	};

	const fetchData = () => {
		axiosClient.get(`/comment/bookId/${+bookId}`).then((res) => {
			setRatingData(res.data);
		});

		axiosClient.get(`/filter/comment/${+bookId}/1`).then((res) => {
			amountComment[0] = res.data.length || 0;
		});
		axiosClient.get(`/filter/comment/${+bookId}/2`).then((res) => {
			amountComment[1] = res.data.length || 0;
		});
		axiosClient.get(`/filter/comment/${+bookId}/3`).then((res) => {
			amountComment[2] = res.data.length || 0;
		});
		axiosClient.get(`/filter/comment/${+bookId}/4`).then((res) => {
			amountComment[3] = res.data.length || 0;
		});
		axiosClient.get(`/filter/comment/${+bookId}/5`).then((res) => {
			amountComment[4] = res.data.length || 0;
		});
	};
	const getTotalStar = () => {
		const totalStar = ratingData.reduce(
			(pre, cur) => (pre += cur.star),
			0,
		);
		return totalStar;
	};

	const getAverageStar = () => {
		return Math.floor(getTotalStar() / ratingData.length, 2) || 0;
	};
	return (
		<div className="px-3 py-6 bg-gray-200 dark:bg-gray-700 ">
			<div className="grid grid-cols-12 items-center gap-8">
				<div className="col-span-4 text-center items-center">
					<div className="text-5xl">{star}</div>
					<div className="mx-auto w-fit">
						<Rating value={star} show={false} />
					</div>
					<div>{ratingData.length || 0}</div>
				</div>
				<div className="col-span-8">
					<div className="flex items-center gap-4">
						<div>5</div>
						<div className="flex-1">
							<div className="relative rounded-md h-[10px] w-full border border-white overflow-hidden bg-blue-500">
								<div
									style={{ left: getPercent(5) }}
									className={`absolute inset-y-0 right-0		
								 bg-white`}
								></div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div>4</div>
						<div className="flex-1 w-[250px]">
							<div className="relative rounded-md h-[10px] w-full border border-white overflow-hidden bg-blue-500">
								<div
									style={{ left: getPercent(4) }}
									className={`absolute inset-y-0 right-0		
								 bg-white`}
								></div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div>3</div>
						<div className="flex-1 w-[250px]">
							<div className="relative rounded-md h-[10px] w-full border border-white overflow-hidden bg-blue-500">
								<div
									style={{ left: getPercent(3) }}
									className={`absolute inset-y-0 right-0		
								 bg-white`}
								></div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div>2</div>
						<div className="flex-1 w-[250px]">
							<div className="relative rounded-md h-[10px] w-full border border-white overflow-hidden bg-blue-500">
								<div
									style={{ left: getPercent(2) }}
									className={`absolute inset-y-0 right-0		
								 bg-white`}
								></div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div>1</div>
						<div className="flex-1 w-[250px]">
							<div className="relative rounded-md h-[10px] w-full border border-white overflow-hidden bg-blue-500">
								<div
									style={{ left: getPercent(1) }}
									className={`absolute inset-y-0 right-0		
								 bg-white`}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RatingView;
