import { createSlice } from "@reduxjs/toolkit";
import { createUserRequest, loginRequest } from "./authService";

const initialState = {
    loading: false,
    errorMsg: '',
    userInfo: null,
    successMessage: '',
    isAuth: false
}


export const login = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.loading = initialState.loading;
            state.isAuth = initialState.isAuth;
            state.userInfo = initialState.userInfo;
            if (action.payload.callback) {
                action.payload.callback();
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginRequest.pending, (state) => {
                state.loading = true;
                state.errorMsg = "";
            })
            .addCase(loginRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.userInfo;
                state.isAuth = true;
                state.successMessage = "Login successful";
                state.errorMsg = "";
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg =
                    action.payload.status === 401
                        ? "Email / Password Invalid"
                        : "Something Went Wrong..!";
            })
            .addCase(createUserRequest.pending, (state) => {
                state.loading = true;
                state.errorMsg = "";
            })
            .addCase(createUserRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "User Created Successful";
                state.errorMsg = "";
            })
            .addCase(createUserRequest.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg =
                    action.payload.status === 401
                        ? "Email / Password Invalid"
                        : "Something Went Wrong..!";
            })
    },
});


export const { logout } = login.actions;

export default login.reducer;
