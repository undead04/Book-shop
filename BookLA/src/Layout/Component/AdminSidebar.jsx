import {
	BanknotesIcon,
	BookmarkIcon,
	BookmarkSquareIcon,
	NewspaperIcon,
	TagIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import DynamicHeroIcon from "../../components/DynamicHeroIcon";
import { Link } from "react-router-dom";
const field = "admin";
const AdminSidebar = () => {
	const menus = [
		{
			title: "Books",
			to: "/books/all",
			icons: "BookmarkIcon",
			children: [
				{
					title: "View all books",
					to: "/books/all",
					icons: "BookmarkSquareIcon",
				},
				{
					title: "Add new book",
					to: "/books/add",
					icons: "PlusIcon",
				},
				{
					title: "Add new category",
					to: "/books/category/add",
					icons: "TagIcon",
				},
			],
		},
		{
			title: "Users",
			to: "/users",
			icons: "UserGroupIcon",
		},
		{
			title: "Orders",
			to: "/order",
			icons: "NewspaperIcon",
		},
		{
			title: "Income",
			to: "/income",
			icons: "BanknotesIcon",
		},
	];

	return (
		<aside className="bg-gray-800 text-white w-64 fixed left-0 top-12 min-h-screen p-4">
			<nav>
				<ul className="space-y-2">
					{menus.map((m) => (
						<li key={m.title}>
							<Link
								to={`/${field}${m.to}`}
								className="flex items-center justify-between p-2 hover:bg-gray-700"
							>
								<div className="flex items-center">
									<span>{m.title}</span>
								</div>
								<DynamicHeroIcon icon={m.icons} />
							</Link>
							{m.children && (
								<ul className="desplegable ml-4">
									{m.children.map((c) => (
										<li key={c.title}>
											<Link
												to={`/${field}${c.to}`}
												className="p-2 hover:bg-gray-700 flex items-center justify-between"
											>
												{c.title}
												<DynamicHeroIcon icon={c.icons} />
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default AdminSidebar;
