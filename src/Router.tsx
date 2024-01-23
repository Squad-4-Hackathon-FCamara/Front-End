import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { MyPortfolio } from "./pages/MyPortfolio"
import { Discover } from "./pages/Discover"
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return (
		<Routes>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/register" element={<Register />}></Route>
			<Route path="/" element={<DefaultLayout />}>
				<Route path="/" element={<MyPortfolio />}></Route>
				<Route path="/discover" element={<Discover />}></Route>
			</Route>
		</Routes>
	)
}