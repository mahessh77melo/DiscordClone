import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Styles/App.css";
import Login from "./Components/Login";
import { auth } from "./firebase";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(
					login({
						uid: user.uid,
						email: user.email,
						photo: user.photoURL,
						displayName: user.displayName,
					})
				);
			} else {
				// console.log("logged out");
				dispatch(logout());
			}
		});
	}, [dispatch]);
	const [sidebarHide, setSidebarHide] = useState(
		window.matchMedia("(max-width:37.5em)").matches
	);
	return (
		<div className="app">
			{user ? (
				<>
					<Sidebar sidebarHide={sidebarHide} setSidebarHide={setSidebarHide} />
					<Chat sidebarHide={sidebarHide} setSidebarHide={setSidebarHide} />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
