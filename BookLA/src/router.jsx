import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Views/Home";
import UserLayout from "./Layout/UserLayout";
import DefaultLayout from "./Layout/DefaultLayout";
import ProductViewLayout from "./Layout/ProductViewLayout";
import Products from "./Views/Products";
import ProductDetail from "./components/Product/ProductDetail";
import Order from "./Views/Order";
import OrderDetail from "./Views/OrderDetail";
import User from "./Views/User";
import Cart from "./Views/Cart";
import GuestLayout from "./Layout/GuestLayout";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import AdminLayout from "./Layout/AdminLayout";
import AdminHome from "./Views/Admin/Home";
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
				path: "/order/:id",
				element: <OrderDetail />,
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
				element: <AdminHome />,
			},
		],
	},
]);

export default router;
