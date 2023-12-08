import {
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const Slider = ({ children }) => {
	useEffect(() => {
		const prevBtn = document.getElementById("prevBtn");
		const scrollContainer = document.getElementById("slide");
	}, []);
	return (
		<div className="">
			<div className="flex items-center">
				<div
					className="border rounded-full border-black flex items-center justify-center"
					id="prevBtn"
				>
					<ArrowLeftIcon className="w-6 h-6 text-black p-2" />
				</div>
				<div className="flex overflow-hidden">
					<div
						className="flex overflow-scroll gap-2 w-[1132px]"
						id="slide"
					>
						{children}
					</div>
				</div>
				<div
					className="border rounded-full border-black flex items-center justify-center"
					id="nextBtn"
				>
					<ArrowRightIcon className="w-6 h-6 text-black p-2" />
				</div>
			</div>
		</div>
	);
};

export default Slider;
