import React from "react";

const Heading = ({ title }) => {
	return (
		<h2 className="flex flex-row flex-nowrap items-center my-8">
			<span
				className="flex-grow block border-t border-black"
				aria-hidden="true"
				role="presentation"
			/>
			<span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
				{title}
			</span>
			<span
				className="flex-grow block border-t border-black"
				aria-hidden="true"
				role="presentation"
			/>
		</h2>
	);
};

export default Heading;
