import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

export const Mypopover = ({ item }) => {
	console.log(item);
	return (
		<Popover className={"relative"}>
			<Popover.Button>{item.title}</Popover.Button>
			<Popover.Panel className={"absolute top-full right-full z-10"}>
				<ul>
					{item.submenu ? (
						<>
							{item.submenu.map((menu, index) => (
								<Mypopover item={menu} key={index} />
							))}
						</>
					) : (
						<Link to={item.url}>{item.title}</Link>
					)}
				</ul>
			</Popover.Panel>
		</Popover>
	);
};
