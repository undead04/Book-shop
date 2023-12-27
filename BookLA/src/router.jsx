import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import DefaultLayout from "./Layout/DefaultLayout";
import ProductViewLayout from "./Layout/ProductViewLayout";
import Products from "./Views/Products";
import ProductDetail from "./components/Product/ProductDetail";
import Order from "./Views/Order";
import User from "./Views/User";
import Cart from "./Views/Cart";
import GuestLayout from "./Layout/GuestLayout";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import AdminLayout from "./Layout/AdminLayout";
// eslint-disable-next-line import/no-unresolved
import { Home } from "./Views/Home";
import AdminForm from "./Views/Admin/AdminForm";
import AdminMain from "./Layout/AdminMain";
import AdminHome from "./Views/Admin/AdminHome";
import BookView from "./Views/Admin/BookView";
import ProductLoader from "./components/Product/ProductLoader";
import ProductDetailLoader from "./components/Product/ProductDetailLoader";
import CategoryForm from "./Views/Admin/CategoryForm";
import Table from "./components/Admin/Table";
import SideForm from "./components/Admin/SideForm";
import { default as AdminOrder } from "./Views/Admin/Order";
import { default as AdminUser } from "./Views/Admin/User";
import DatePicker from "./components/DatePicker";
import CommentModal from "./components/CommentModal";
import RatingView from "./components/RatingView";
import BuyingForm from "./components/BuyingForm";
import StarRating from "./components/StarRating";
import Income from "./Views/Admin/Income";
const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/test",
				element: <StarRating />,
			},
		],
	},
	{
		path: "/",
		element: <ProductViewLayout />,
		children: [
			{
				path: "/book/:id",
				element: <ProductDetail />,
			},
			{
				path: "/book/all",
				element: <Products />,
			},
			{
				path: "/book/all/:search",
				element: <Products />,
			},
			{
				path: "/book/type/:typeID",
				element: <Products />,
			},
		],
	},
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{
				path: "/user",
				element: <User />,
			},
			{
				path: "/order",
				element: <Order />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
		],
	},
	{
		path: "/",
		element: <GuestLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
	{
		path: "/",
		element: <AdminLayout />,
		children: [
			{
				path: "/admin",
				element: <AdminMain />,
				children: [
					{
						path: "/admin",
						element: <AdminHome />,
					},
					{
						path: "/admin/books/all",
						element: <BookView />,
					},
					{
						path: "/admin/books/add",
						element: <AdminForm />,
					},
					{
						path: "/admin/books/edit/:id",
						element: <AdminForm />,
					},
					{
						path: "/admin/books/category/add",
						element: <CategoryForm />,
					},
					{
						path: "/admin/order",
						element: <AdminOrder />,
					},
					{
						path: "/admin/users",
						element: <AdminUser />,
					},
					{
						path: "/admin/income",
						element: <Income />,
					},
				],
			},
		],
	},
]);

export default router;
