import React from "react";
import "../Styles/ChatHeader.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HelpIcon from "@material-ui/icons/Help";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { IconButton } from "@material-ui/core";

const ChatHeader = ({ channelName, setSidebarHide }) => {
	var phone = window.matchMedia("(max-width:37.5em)");
	return (
		<div className="chat-header">
			<div className="chat-header__left">
				<IconButton
					onClick={phone.matches ? () => setSidebarHide((s) => !s) : () => {}}
				>
					<MenuOpenIcon className="toggler" />
				</IconButton>
				<span>#</span>
				{channelName}
			</div>
			<div className="chat-header__right">
				<IconButton>
					<NotificationsIcon />
				</IconButton>
				<IconButton>
					<EditLocationIcon />
				</IconButton>
				<IconButton>
					<PeopleAltIcon />
				</IconButton>
				<div className="chat-search">
					<SearchIcon />
					<input
						type="text"
						placeholder="Search"
						className="chat-search__input"
						name="search"
						id="search"
					/>
				</div>
				<IconButton>
					<SendIcon />
				</IconButton>
				<IconButton>
					<HelpIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default ChatHeader;
