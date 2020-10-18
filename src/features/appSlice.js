import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name: "app",
	initialState: {
		channelId: "0ey9v6SfFytO8owd8nlJ",
		channelName: "IPL chat",
	},
	reducers: {
		setChannelInfo: (state, action) => {
			state.channelId = action.payload.channelId;
			state.channelName = action.payload.channelName;
		},
	},
});
export const { setChannelInfo } = appSlice.actions;
export const selectChannelId = (state, action) => state.app.channelId;
export const selectChannelName = (state, action) => state.app.channelName;

export default appSlice.reducer;
