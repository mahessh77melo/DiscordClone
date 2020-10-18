import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../features/appSlice";
import "../Styles/SidebarChannel.css";

const SidebarChannel = ({ channel, id }) => {
	const dispatch = useDispatch();
	return (
		<div
			className="sidebar-channel"
			onClick={() =>
				dispatch(
					setChannelInfo({ channelId: id, channelName: channel.channelName })
				)
			}
		>
			<span>#</span>
			<h3 className="channel__name">{channel.channelName || "Youtube"}</h3>
		</div>
	);
};

export default SidebarChannel;
