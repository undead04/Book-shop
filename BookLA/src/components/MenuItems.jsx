import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useRef, useState } from "react";

const MenuItems = ({ items, depthLevel }) => {
	const [dropdown, setDropdown] = useState(false);
	const ref = useRef();
	useEffect(() => {
		const handler = (e) => {
			if (
				dropdown &&
				ref.current &&
				!ref.current.contains(e.target)
			) {
				setDropdown(false);
			}
		};

		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("mousedown", handler);
		};
	}, [dropdown]);

	const onMouseEnter = () => {
		setDropdown(true);
	};

	const onMouseLeave = () => {
		setDropdown(false);
	};
	return (
		<li
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`relative text-sm tracking-wide truncate py-3  hover:bg-primary`}
			ref={ref}
		>
			{items.submenu ? (
				<>
					<button
						className="px-4"
						type="button"
						aria-expanded={dropdown ? "true" : "false"}
						aria-haspopup="menu"
						onClick={() => setDropdown((prev) => !prev)}
					>
						{items.title}{" "}
						{depthLevel > 0 ? (
							<span>&raquo;</span>
						) : (
							<span className="arrow" />
						)}
					</button>
					<Dropdown
						depthLevel={depthLevel}
						submenus={items.submenu}
						dropdown={dropdown}
					/>
				</>
			) : (
				<Link className="px-4" to={items.url}>
					{items.title}
				</Link>
			)}
		</li>
	);
};

export default MenuItems;
