import React, { useEffect, useState } from "react";
import "../Styles/Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GifIcon from "@material-ui/icons/Gif";
import SendIcon from "@material-ui/icons/Send";
import RedeemIcon from "@material-ui/icons/Redeem";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import $ from "jquery";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelName } from "../features/appSlice";
import db from "../firebase";
import { IconButton } from "@material-ui/core";
import firebase from "firebase";

const Chat = ({ setSidebarHide, sidebarHide }) => {
	const user = useSelector(selectUser);
	const channelName = useSelector(selectChannelName);
	const channelId = useSelector(selectChannelName);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	var phone = window.matchMedia("(max-width:37.5em)");

	useEffect(() => {
		if (channelId) {
			db.collection("channels")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snap) =>
					setMessages(
						snap.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
					)
				);
		}
	}, [channelId, messages]);
	useEffect(() => {
		$(".chat__messages").scrollTop = $(".chat__messages").scrollHeight;
	}, [channelId]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (input) {
			db.collection("channels").doc(channelId).collection("messages").add({
				message: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user,
			});
		}
		setInput("");
	};

	return (
		<div
			className="chat"
			style={{
				filter: sidebarHide
					? "none"
					: phone.matches
					? "blur(5px) brightness(0.5)"
					: "none",
				transition: "all .2s ease-in",
			}}
		>
			<ChatHeader setSidebarHide={setSidebarHide} channelName={channelName} />
			<div
				className="chat__messages"
				onClick={() =>
					setSidebarHide(window.matchMedia("(max-width:37.5em)").matches)
				}
			>
				{messages.map((item) => (
					<Message
						key={item.id}
						message={item.data.message}
						user={item.data.user}
						timestamp={item.data.timestamp}
					/>
				))}
			</div>
			<div className="chat__input">
				<AddCircleIcon />
				<form className="chat__input-wrapper" onSubmit={sendMessage}>
					<input
						type="text"
						value={input}
						disabled={!channelId}
						onChange={(e) => setInput(e.target.value)}
						className="chat__input--field"
						placeholder={channelName && `Message ${channelName}`}
						name="chat"
					/>
					<IconButton onClick={sendMessage}>
						<SendIcon />
					</IconButton>
				</form>
				<GifIcon />
				<RedeemIcon />
				<EmojiEmotionsIcon />
			</div>
		</div>
	);
};

export default Chat;
