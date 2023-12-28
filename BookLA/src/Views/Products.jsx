import React, { useEffect, useRef, useState } from "react";
import Filter from "../components/Filter";
import ProductCardMin from "../components/Product/ProductCardMin";
import axiosClient from "../axios-client";
import ProductLoader from "./../components/Product/ProductLoader";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import { Menu } from "@headlessui/react";
import useDebounce from "../hooks/useDebounce";

const products = [];
const Products = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [upToDown, setUpToDown] = useState("price-desc");
	const [category, setCategory] = useState([]);
	const { search, typeID } = useParams();
	const [selectedTypes, setSelectedTypes] = useState(() =>
		typeID ? [typeID] : [],
	);
	const [searchValue, setSearchValue] = useState(search || "");
	const [typOpen, setTypOpen] = useState(false);
	const debounceValue = useDebounce(searchValue, 400);
	useEffect(() => {
		if (search) {
			setSearchValue(search);
		}
		axiosClient.get("/category").then((res) => {
			setCategory(res.data.categorys);
		});
	}, []);

	useEffect(() => {
		fetchData();
	}, [debounceValue, selectedTypes, upToDown]);

	const fetchData = () => {
		axiosClient
			.get(
				`/Filter?sortby=${upToDown}&search=${searchValue}${
					selectedTypes.length > 0
						? "&categoryId=" + selectedTypes.join(",")
						: ""
				}`,
			)
			.then((res) => {
				setLoading ? setLoading(true) : "";

				setBooks(res.data.book);
				setLoading ? setLoading(false) : "";
			});
	};
	const handleCheckboxChange = (id) => {
		if (selectedTypes.includes(id)) {
			var newTypes = selectedTypes.filter((s) => s !== id);
			setSelectedTypes(newTypes);
		} else {
			console.log("Add item", id);
			setSelectedTypes((prev) => [...prev, id]);
		}
	};
	return (
		<div className="mt-8 container">
			<div>
				<div className="mx-auto dark:text-white">
					<div className="lg:min-w-[400px] block mx-4 relative">
						<div className="flex rounded-full bg-primary px-2 w-full max-w-auto ring-frost ring-1 dark:ring-gray-500">
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
								onChange={(e) => {
									setSearchValue(e.target.value);
								}}
								value={searchValue}
								type="text"
								className={`w-full bg-primary
						dark:text-white
						 flex bg-transparent pl-2 text-secondary
						 outline-0 `}
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
						</div>
					</div>
					<div className="flex items-center mt-4">
						<div className="min-w-[200px]">
							<button
								className="ml-4 pl-2"
								onClick={() =>
									setUpToDown((prev) =>
										prev == "price-desc" ? "price-asc" : "price-desc",
									)
								}
							>
								{upToDown == "price-desc" ? (
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
						<div className="relative ml-auto min-w-[300px]">
							{isNaN(typeID) && (
								<div>
									<button
										className={
											"w-full border dark:border-white p-4 shadow-lg"
										}
										onClick={() => setTypOpen((prev) => !prev)}
									>
										Chọn thể loại
									</button>
								</div>
							)}
						</div>
					</div>
					{typOpen && (
						<div className="bg-blue-200 dark:bg-blue-950 shadow-lg inset-x-0 mt-2">
							<div className="grid grid-cols-3">
								{category.map((c) => (
									<div key={c.name}>
										<div className="">
											<input
												hidden
												id={c.name}
												type="checkbox"
												name="typ_id[]"
												value={c.id}
												onChange={() => handleCheckboxChange(c.id)}
												checked={
													selectedTypes.includes(c.id) || false
												}
											/>
											<label
												htmlFor={`${c.name}`}
												className={`block p-4 hover:bg-blue-300 ${
													selectedTypes.includes(c.id)
														? "bg-blue-600"
														: ""
												}`}
											>
												{c.name}
											</label>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mt-4 py-2">
				{loading ? (
					<>
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
						<ProductLoader />
					</>
				) : (
					<>
						{books.map((b) => (
							<ProductCardMin items={b} key={b.id} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Products;
