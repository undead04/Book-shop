import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Rating from "../Rating";
import axiosClient from "../../axios-client";
import { currencyFormatter } from "../../util/currencyFormatter";

const test = {
	name: "The Catcher in the Rye",
	description:
		"Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.",
	price: 58,
	image: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
	rating: "4",
	subImage: [
		"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
		"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
		"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
	],
};
const ProductDetailLoader = () => {
	return (
		<section className="text-gray-700 bg-white dark:text-white dark:bg-gray-900 body-font overflow-hidden animate-pulse">
			<div className="container px-5 py-12 mx-auto">
				<div className="lg:w-4/5 mx-auto flex flex-wrap">
					<div className="lg:w-1/2 w-full object-cover object-center rounded border border-slate-600 bg-gray-700" />
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h2 className="h-4 w-1/6 bg-gray-200 dark:bg-gray-700 tracking-widest"></h2>
						<h1 className="h-6 loader text-3xl title-font font-medium my-2"></h1>
						<div className="flex mb-2">
							<div className="h4 w-1/2 loader"></div>
							<span className="flex ml-3 pl-3 py-2 border-l-2 border-slate-200 dark:border-slate-700">
								<div className="loader h-5 w-5 text-gray-200"></div>
								<div className="loader h-5 w-5 ml-2 text-gray-200"></div>
								<div className="loader h-5 w-5 ml-2 text-gray-200"></div>
							</span>
						</div>
						<div className="flex mt-6 h-6 w-2/3 loader items-center mb-1"></div>
						<div className="border border-gray-200 dark:border-gray-600 mb-4" />
						<div className="flex items-center">
							<div className="h-10 loader w-2/6 rounded-sm"></div>

							<div className="h-10 loader w-1/12 ml-2 rounded-sm"></div>
							<div className="flex ml-auto h-10 w-1/3 loader  py-2 px-6 rounded"></div>
							<div className="w-10 h-10 rounded-full loader p-0 border-0 inline-flex items-center justify-center text-gray-200 ml-4"></div>
						</div>
						<div className="flex items-center mt-4 border dark:border-slate-600">
							<div
								className={
									"w-24 h-24 m-2 rounded-md loader border-slate-600"
								}
							></div>

							<div
								className={
									"w-24 h-24 m-2 rounded-md loader border-slate-100"
								}
							></div>
							<div
								className={
									"w-24 h-24 m-2 rounded-md loader border-slate-100"
								}
							></div>
							<div
								className={
									"w-24 h-24 m-2 rounded-md loader border-slate-100"
								}
							></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetailLoader;
