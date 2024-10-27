import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogIn: false,
    logData: {},
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLogin: (state, actions) => {
            const { login, data } = actions.payload;
            state.isLogIn = login;
            state.logData = data;
        },
        resetState: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const { setAuthLogin, resetState } = authSlice.actions;

export default authSlice.reducer;
