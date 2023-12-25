import React, { useEffect, useState } from "react";

const Pagination = ({ total, cur = 1 }) => {
	const [pages, setPages] = useState(function () {
		const newPage = [];

		for (let i = 1; i <= total; i++) {
			newPage.push({
				id: i,
				selected: i == cur,
			});
		}
		return newPage;
	});

	const [current, setCurrent] = useState(cur);
	useEffect(() => {
		let newArr = [];
		let leftcount = 0;
		let rightCount = 0;
		for (let i = 1; i < total; i++) {
			if (leftcount <= 3) {
				newArr.push({ id: i, selected: i == current });
				leftcount++;
			} else {
				newArr.push({
					id: total - rightCount,
					selected: total - rightCount == current,
				});
				rightCount++;
			}
		}
	}, [current]);

	const handleSelected = (id) => {
		let oldSelectedItem = pages.find((p) => p.selected);
		oldSelectedItem.selected = false;

		let selectedItem = pages.find((p) => (p.id = id));
		selectedItem.selected = true;
		console.log(selectedItem, oldSelectedItem);
		setCurrent(selectedItem.id);
	};
	return (
		<div className="flex items-center justify-center gap-2">
			{pages.map((p) => (
				<div
					className={`${
						p.selected ? "text-white bg-indigo-700" : ""
					} text-black  p-3 border w-12 h-12 text-center flex items-center justify-center`}
					onClick={() => handleSelected(p.id)}
				>
					{p.id}
				</div>
			))}
		</div>
	);
};

export default Pagination;
