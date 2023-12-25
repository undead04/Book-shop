import React from "react";

export function formatDate(date) {
	var year = date.getFullYear();
	var month = padZero(date.getMonth() + 1);
	var day = padZero(date.getDate());
	var hours = padZero(date.getHours());
	var minutes = padZero(date.getMinutes());
	var seconds = padZero(date.getSeconds());

	return (
		month +
		"/" +
		day +
		"/" +
		year +
		" " +
		hours +
		":" +
		minutes +
		":" +
		seconds
	);
}

// Hàm để thêm số 0 vào trước các số từ 1 đến 9
function padZero(number) {
	return number < 10 ? "0" + number : number;
}
