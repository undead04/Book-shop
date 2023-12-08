import { Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
const booksList = [
	{
		id: "1",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "2",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},

	{
		id: "3",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "5",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "4",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "5",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "6",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "7",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "8",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "9",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "10",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "11",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
	{
		id: "12",
		description:
			"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat,",
		image:
			"https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg",
		rating: "8.8",
		name: "Spider-Man: Across the Spider-Verse",
		release: "2023",
	},
];
const Search = ({ showResult = true, passData, ...props }) => {
	const initialValue = [
		{
			name: "Iphone 7 Pro",
			image:
				"https://imgs.search.brave.com/EXWolnGxPr6qJPKMAvW6PEKTrIWcKZzx0YCK6gU8RMQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9hc3IvNzFm/ODg1NTAtMTllNC00/MzRkLWJkOTYtMWI3/MDNhNDczNWJjLmQz/MzExNWU1NTY1Mjc2/ZTA3YzZlNDQ3NDc5/MGE1ZDllLmpwZWc_/b2RuSGVpZ2h0PTc4/NCZvZG5XaWR0aD01/ODAmb2RuQmc9RkZG/RkZG",
		},
		{
			name: "Axus laptop",
			image:
				"https://imgs.search.brave.com/8gHnOJdLbY8RjlUY4YP9S8ZQybhmHN-Rc4qx-GkuwKc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/ODg4NzI2NTc1Nzgt/N2VmZDFmMTU1NWVk/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tm54OFlY/TjFjeVV5TUd4aGNI/UnZjSHhsYm53d2ZI/d3dmSHg4TUE9PQ.jpeg",
		},
	];
	const searchRef = useRef();
	const [searchResult, setSearchResult] = useState(initialValue);
	const [value, setValue] = useState("");
	const [open, setOpen] = useState(false);
	const debounceValue = useDebounce(value, 400);
	useEffect(() => {
		//Call api

		console.log(value);
		if (passData) {
			passData(booksList);
		}
		setSearchResult(searchResult);
	}, [open, debounceValue]);
	return (
		<>
			{/* <div className="lg:hidden block ml-4 p-4">
				<Popover>
					<Popover.Button>
						<MagnifyingGlassIcon className="w-8 h-8" />
					</Popover.Button>

					<Popover.Panel></Popover.Panel>
				</Popover>
			</div> */}
			<div className="lg:min-w-[400px] block mx-4 relative">
				<div className="flex rounded-full bg-primary px-2 w-full max-w-auto ring-frost ring-1">
					<button className="self-center flex p-1 cursor-pointer bg-primary">
						{" "}
						<svg
							width="30px"
							height="30px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z"
									stroke="#ff5c5c"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>{" "}
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z"
									stroke="#ff5c5c"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>{" "}
								<path
									d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z"
									fill="#ff5c5c"
								/>{" "}
							</g>
						</svg>
					</button>
					<input
						spellCheck={false}
						ref={searchRef}
						onChange={(e) => setValue(e.target.value)}
						value={value}
						type="text"
						className={`w-full bg-primary
						 flex bg-transparent pl-2 text-secondary
						 outline-0 `}
						{...props}
						onFocus={() => setOpen(true)}
						onBlur={() => setOpen(false)}
					/>
					<button
						type="submit"
						className="relative p-2 bg-primary rounded-full"
					>
						<svg
							width="30px"
							height="30px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path
									d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
									stroke="#999"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>{" "}
							</g>
						</svg>
					</button>

					<Transition
						show={open && showResult}
						enter="transition-opacity duration-75"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity duration-150"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="absolute inset-x-0 top-full h-auto rounded-b-xl bg-white bg-clip-border text-gray-700 shadow-md pt-2 mt-2 z-10">
							<div className="px-4">
								{searchResult.map((s, i) => (
									<div key={i} className="w-full py-2">
										<div className="flex">
											<div className="flex items-center">
												<div className="w-[100px]">
													<img
														className="w-auto h-[40px]"
														src={s.image}
														alt=""
													/>
												</div>
												<span className="pl-4">{s.name}</span>
											</div>
											<div>{/* Icons */}</div>
										</div>
									</div>
								))}

								<div>
									<div>
										<div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-md font-bold">
											<Link to={"#"} className="text-blue-600">
												See more
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	);
};

export default Search;
