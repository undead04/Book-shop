import React, { useEffect, useState } from "react";
import Search from "./Search";
import { bookTypesData } from "../menuItemsData";
import { Transition } from "@headlessui/react";
const booksList = [
	{
		id: "1",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "2",
		title: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "2",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "4",
		title: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
];
const Filter = ({ setPassData }) => {
	const [type, setType] = useState([]);
	const [upToDown, setUpToDown] = useState(true);
	const [searchResult, setSearchResult] = useState([]);
	useEffect(() => {
		if (upToDown) {
			// dung bien searchResult dc pass tu Search de sap xep
			// sap xep theo gia
		} else {
			// sap xep nguoc lai
		}
	}, [upToDown]);
	const _setSearchResult = (data) => {
		setSearchResult(data);
	};
	useEffect(() => {
		//Call api
		setPassData(searchResult);

		console.log(2);
	}, [searchResult]);

	useEffect(() => {
		const exarr = bookTypesData.map((p) =>
			p.submenu.map((s) => s.title),
		);
		setType(exarr[0]);
	}, []);
	return (
		<div>
			<div className="mx-auto">
				<Search
					showResult={false}
					placeholder="Search for books..."
					passData={_setSearchResult}
				/>
				<div className="flex items-center">
					<div>
						<button
							className="ml-4 pl-2"
							onClick={() => setUpToDown((prev) => !prev)}
						>
							{upToDown ? (
								<div className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
										/>
									</svg>
									<span className="inline-block ml-2">
										Giá: Cao đến thấp
									</span>
								</div>
							) : (
								<div className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
										/>
									</svg>
									<span className="inline-block ml-2">
										Giá: Thấp đến cao
									</span>
								</div>
							)}
						</button>
					</div>
					<div className="mx-auto my-4 py-2 w-[600px] overflow-x-scroll">
						<div className="flex flex-nowrap">
							{type.map((t, i) => (
								<div
									className="inline-flex mx-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
									key={i}
								>
									<button className="whitespace-nowrap">{t}</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;
