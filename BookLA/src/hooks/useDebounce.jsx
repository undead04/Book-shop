import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
	const [debounce, setDebounce] = useState(value);
	useEffect(() => {
		const timeOutId = setTimeout(() => {
			setDebounce(value);
		}, delay);

		return () => clearTimeout(timeOutId);
	}, [value]);
	return debounce;
};

export default useDebounce;
