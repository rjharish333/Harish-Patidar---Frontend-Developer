import { createSlice } from "@reduxjs/toolkit"

// auth slice to manage auth data using redux
const initialState = {
    isLoggedIn: false,
    jwtToken: null
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.jwtToken = action.payload.jwtToken;
        },
        setSignOut: (state) => {
            state.isLoggedIn = false;
            state.jwtToken = null;
        }
    }
});

export const { setSignIn, setSignOut} = authSlice.actions;

export const getIsLoggedIn = (state) => state.userAuth?.isLoggedIn;
export const getJwtToken = (state) => state.userAuth?.jwtToken;

export default authSlice.reducer;