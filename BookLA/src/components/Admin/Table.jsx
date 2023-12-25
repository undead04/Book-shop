import React, { useEffect, useRef, useState } from "react";
import { currencyFormatter } from "../../util/currencyFormatter";

const Table = ({
	checkbox = true,
	fieldList,
	dataList,
	isChecked,
	onCheckboxChange,
	onItemSelected,
}) => {
	// demo field:
	/**
     * [
		{
			type: "text",
			fieldName: "Book's name",
			keyName: "name",
		},
		{
			type: "image",
			fieldName: "Image",
			keyName: "image",
		},
		{
			type: "arrayString",
			fieldName: "Category(s)",
			keyName: "nameCategory",
		},
		{
			type: "money",
			fieldName: "Price",
			keyName: "newPrice",
		},
	]
     * 
     */
	const [field, setField] = useState(fieldList);

	const [data, setData] = useState(dataList);

	const handleCheckboxChange = () => {
		onCheckboxChange(!isChecked);
	};

	const handleItemCheck = (e) => {
		onItemSelected(e.target.value);
	};
	useEffect(() => {
		if (fieldList) {
			setField(fieldList);
		}

		if (dataList) {
			setData(dataList);
		}
	}, [fieldList, dataList]);

	const renderItem = ({ type, fieldName, keyName }, d) => {
		let htmlString = <>{d[keyName] ? d[keyName] : "hi"}</>;
		if (type === "image") {
			htmlString = (
				<img
					src={`${import.meta.env.VITE_API_BASE_URL}/api/Image/${
						d[keyName]
					}`}
					className="w-auto h-[40px]"
				/>
			);
		}
		if (type === "money") {
			htmlString = <>{currencyFormatter.format(d[keyName])}</>;
		}
		if (type == "arrayString") {
			htmlString = <>{d[keyName].join(", ")}</>;
		}
		if (type == "checkbox") {
			htmlString = (
				<div className="flex items-center w-4 p-4">
					<input
						id="checkbox-table-search-1"
						type="checkbox"
						name="item[]"
						value={d.id}
						checked={d.checked}
						onChange={handleItemCheck}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						htmlFor="checkbox-table-search-1"
						className="sr-only"
					>
						checkbox
					</label>
				</div>
			);
		}
		return (
			<td key={`pro-id-${d.id}${fieldName}`} className="px-6 py-4">
				{htmlString}
			</td>
		);
	};

	const renderField = (
		{ type = "text", fieldName, keyName },
		key,
	) => {
		let htmlString = fieldName;
		if (type == "checkbox") {
			htmlString = (
				<div className="flex items-center">
					<input
						id="checkbox-all-search"
						type="checkbox"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						checked={isChecked}
						onChange={handleCheckboxChange}
					/>
					<label htmlFor="checkbox-all-search" className="sr-only">
						checkbox
					</label>
				</div>
			);
		}
		return (
			<th key={key} scope="col" className="px-6 py-3">
				{htmlString}
			</th>
		);
	};

	return (
		<table className="table">
			<thead className="table-head">
				<tr>{field && field.map((f, i) => renderField(f, i))}</tr>
			</thead>
			<tbody>
				{data &&
					data.map((d) => (
						<tr key={d.id} className="table-row">
							{field.map((f, i) => renderItem(f, d))}
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default Table;
