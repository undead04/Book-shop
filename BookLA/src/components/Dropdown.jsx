import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
	depthLevel = depthLevel + 1;
	return (
		<ul
			className={`${dropdown ? "block z-10" : "hidden"} ${
				depthLevel > 1 ? "absolute left-full top-0" : ""
			}`}
		>
			{submenus.map((submenu, index) => (
				<MenuItems
					items={submenu}
					key={index}
					depthLevel={depthLevel}
				/>
			))}
		</ul>
	);
};

export default Dropdown;
