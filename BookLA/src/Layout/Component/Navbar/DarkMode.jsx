import React, { useEffect, useState } from "react";
import Button from "./../../../components/Button";
import {
	CalendarDaysIcon,
	MoonIcon,
	SunIcon,
} from "@heroicons/react/24/outline";

const DarkMode = () => {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, []);
	const handleChangeTheme = () => {
		setTheme(theme == "dark" ? "light" : "dark");
	};

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);
	return (
		<div>
			<button onClick={handleChangeTheme} className="mx-4">
				{theme == "light" ? (
					<SunIcon className="w-8 h-8 text-black" />
				) : (
					<MoonIcon className="w-8 h-8 text-gray-200" />
				)}
			</button>
		</div>
	);
};

export default DarkMode;
