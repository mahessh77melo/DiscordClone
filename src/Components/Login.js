import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import "../Styles/Login.css";

const Login = () => {
	const signIn = () => {
		auth.signInWithPopup(provider).catch((err) => {
			alert(err.message);
		});
	};
	return (
		<div className="login">
			<div>
				<img
					className="login__logo"
					src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png"
					alt="Discord LOGO"
				/>
			</div>
			<Button
				className="login__button"
				variant="contained"
				color="primary"
				onClick={signIn}
			>
				Sign In with Google
			</Button>
		</div>
	);
};

export default Login;
