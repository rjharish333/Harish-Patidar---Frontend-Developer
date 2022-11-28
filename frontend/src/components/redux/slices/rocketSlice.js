import { createSlice } from "@reduxjs/toolkit"

// auth slice to manage capsules data using redux
const initialState = {
    rockets: [],
    loadingStaus: false
}

const rocketSlice = createSlice({
    name: 'spacex',
    initialState,
    reducers: {
        setSpacexRockets: (state, action) => {
            state.rockets = action.payload;
        },
        setLoadingStatus: (state, action) => {
            state.loadingStaus = action.payload;
        }
    }
});

export const { setSpacexRockets, setLoadingStatus} = rocketSlice.actions;

export const getSpacexRockets = (state) => state.spacex.rockets;
export const getLoadingStatus = (state) => state.spacex.loadingStaus;

export default rocketSlice.reducer;