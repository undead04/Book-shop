import React, { useEffect, useState } from "react";
import { formatDate } from "../util/dateTimeFormatter";

const DatePicker = ({ handleGetDateTime }) => {
	const [selectedDay, setSelectedDay] = useState("1");
	const [selectedMonth, setSelectedMonth] = useState("1");
	const [selectedYear, setSelectedYear] = useState("2023");

	const handleDayChange = (event) => {
		console.log(event.target.value);
		setSelectedDay(event.target.value);
	};

	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
	};

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};

	useEffect(() => {
		var customDate = new Date(
			selectedYear,
			selectedMonth - 1,
			selectedDay,
		);
		// Biến đổi đối tượng Date thành chuỗi thời gian theo định dạng "MM/DD/YYYY HH:mm:ss"
		var formattedDate = formatDate(customDate);
		handleGetDateTime(formattedDate);
	}, [selectedDay, selectedMonth, selectedYear]);
	const handleSubmit = () => {
		// Gọi API với các giá trị đã được chọn
		const apiData = {
			day: selectedDay,
			month: selectedMonth,
			year: selectedYear,
		};
		var customDate = new Date(
			selectedYear,
			selectedMonth - 1,
			selectedDay,
		);

		// Biến đổi đối tượng Date thành chuỗi thời gian theo định dạng "MM/DD/YYYY HH:mm:ss"
		var formattedDate = formatDate(customDate);

		// Gọi hàm gửi API ở đây, ví dụ:
		// callApiFunction(apiData);
	};

	// Mảng chứa ngày từ 1 đến 31
	const days = Array.from({ length: 31 }, (_, index) => index + 1);

	// Mảng chứa tháng từ 1 đến 12
	const months = Array.from({ length: 12 }, (_, index) => index + 1);

	// Mảng chứa năm từ 1900 đến năm hiện tại + 5
	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: 30 },
		(_, index) => currentYear - index,
	);

	return (
		<div>
			<select
				className="button text-black mx-2 px-2"
				value={selectedDay}
				onChange={handleDayChange}
			>
				{days.map((day) => (
					<option key={`day-${day}`} value={day}>
						{day}
					</option>
				))}
			</select>
			<span className="text-gray-200">/</span>
			<select
				className="button text-black mx-2 px-2"
				value={selectedMonth}
				onChange={handleMonthChange}
			>
				{months.map((month) => (
					<option key={`month-${month}`} value={month}>
						{month}
					</option>
				))}
			</select>
			<span className="text-gray-200">/</span>
			<select
				className="button text-black mx-2 px-2"
				value={selectedYear}
				onChange={handleYearChange}
			>
				{years.map((year) => (
					<option key={`year-${year}`} value={year}>
						{year}
					</option>
				))}
			</select>
		</div>
	);
};

export default DatePicker;
