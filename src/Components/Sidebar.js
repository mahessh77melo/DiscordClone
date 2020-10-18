import React, { useEffect, useState } from "react";
import "../Styles/Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import HeadsetIcon from "@material-ui/icons/Headset";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../firebase";

const Sidebar = ({ sidebarHide, setSidebarHide }) => {
	const user = useSelector(selectUser);
	const [channels, setChannels] = useState([]);
	var phone = window.matchMedia("(max-width:37.5em)");
	useEffect(() => {
		db.collection("channels").onSnapshot((snapshot) =>
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					channel: doc.data(),
				}))
			)
		);
	}, []);

	const addChannel = () => {
		const channelName = prompt("Enter the channel Name");
		if (channelName) {
			db.collection("channels").add({
				channelName: channelName,
			});
		}
	};

	return (
		<div
			className="sidebar"
			style={{
				// display: sidebarHide ? "none" : "flex",
				position: sidebarHide ? "fixed" : phone.matches ? "fixed" : "relative",
				transform: sidebarHide ? "translateX(-100%)" : "translateX(0%)",
				transition: "all .3s",
			}}
		>
			<h3 className="sidebar__top">
				@brutall_geek
				<IconButton
					onClick={phone.matches ? () => setSidebarHide(true) : () => {}}
				>
					<MenuOpenIcon className="toggler" />
				</IconButton>
			</h3>
			<div className="sidebar__channels">
				<h3 className="sidebar__channels-header">
					<span>
						<ExpandMoreIcon />
						Text Channels
					</span>
					<IconButton onClick={addChannel}>
						<AddIcon />
					</IconButton>
				</h3>
				<div className="sidebar__channels-list">
					{channels.map(({ channel, id }) => (
						<SidebarChannel channel={channel} key={id} />
					))}
				</div>
			</div>
			<div className="sidebar__voice">
				<SignalCellularAltIcon />
				Voice Connected
				<span>
					<InfoOutlinedIcon />
					<CallIcon />
				</span>
			</div>
			<div className="sidebar__profile">
				<Avatar src={user.photo} />
				<div className="sidebar__profile--name">
					<h3>{user.displayName}</h3>
					<span>#{user.uid.substring(0, 5)}</span>
				</div>
				<div className="sidebar__profile--icons">
					<MicIcon />
					<HeadsetIcon />
					<ExitToAppIcon onClick={() => auth.signOut()} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
