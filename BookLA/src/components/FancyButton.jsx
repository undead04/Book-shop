import React from "react";
import { Link } from "react-router-dom";

const FancyButton = ({ to, title }) => {
	return (
		<Link
			to={to}
			className="group relative h-12 w-48 py-4 px-6 overflow-hidden rounded-lg bg-white text-lg shadow"
		>
			<div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
			<span className="relative text-black group-hover:text-white">
				{title}
			</span>
		</Link>
	);
};

export default FancyButton;
