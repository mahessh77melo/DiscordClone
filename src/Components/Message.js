import { Avatar } from "@material-ui/core";
import React from "react";
import "../Styles/Message.css";

const Message = ({ message, timestamp, user }) => {
	return (
		<div className="message">
			<Avatar src={user.photo} />
			<div className="message__content">
				<div className="message__user">
					<h4 className="message__name">{user.displayName}</h4>
					<p className="message__time">
						{new Date(timestamp?.toDate()).toLocaleString() !== "Invalid Date"
							? new Date(timestamp?.toDate()).toLocaleString()
							: "Just Now"}
					</p>
				</div>
				<p className="message__text">{message}</p>
			</div>
		</div>
	);
};

export default Message;
