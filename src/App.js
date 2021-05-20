import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./Components/Main/Main";

export default function App() {
	/* AUTHENTICATION */
	const [isLoggedIn, setLoggedIn] = useState(true);
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...loginForm }),
			});
			const data = await response.json();
			if (data.token) {
				window.localStorage.setItem("token", data.token);
				window.localStorage.setItem("username", data.username);
				setLoggedIn(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogout = () => {
		console.log("hello");
		window.localStorage.clear();
		setLoggedIn(false);
	};

	const handleLoginChange = (e) => {
		e.preventDefault();
		setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
	};

	/* END AUTHENTICATION */

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			return (
				<div className="App">
					<Main />
					<br />
					<button onClick={handleLogout}>Log out</button>
				</div>
			);
		}
	}, [isLoggedIn]);

	return (
		<div className="App">
			{isLoggedIn ? (
				<>
					<Main />
					<br />
					<button onClick={handleLogout}>Log out</button>
				</>
			) : (
				<>
					<center>
						<h1>Log In to See your bookmarks</h1>
					</center>
					<form
						onSubmit={handleLogin}
						style={{
							marginTop: "-10px",
							marginLeft: "30px",
							marginRight: "30px",
							border: "1px dashed #b3aa04",
							borderRadius: "0%",
							padding: "16px",
							boxShadow: "8px 8px 16px rgba(0,0,0, 0.1)",
						}}
					>
						<label>
							{/* {" "}
              Username:{" "} */}
							<input
								type="text"
								id="username"
								placeholder="username"
								value={loginForm.username}
								onChange={handleLoginChange}
							/>
						</label>
						<br />
						{/* <br /> */}
						<label>
							{/* {" "}
                Password:{" "} */}
							<input
								type="password"
								id="password"
								placeholder="password"
								value={loginForm.password}
								onChange={handleLoginChange}
							/>
						</label>
						<br />
						<br />
						<input type="submit" />
					</form>
				</>
			)}
		</div>
	);
}
