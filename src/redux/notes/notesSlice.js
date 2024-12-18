import { createSlice } from "@reduxjs/toolkit";
import { getUserNotes, searchNoteRequest } from "./notesService";

const initialState = {
    loading: false,
    errorMsg: '',
    userNotes: null,
}

export const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserNotes.pending, (state) => {
                state.loading = true;
                state.errorMsg = "";
            })
            .addCase(getUserNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.userNotes = action.payload;
                state.errorMsg = "";
            })
            .addCase(getUserNotes.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload.errorMsg || "Something Went Wrong..!";
            })
            .addCase(searchNoteRequest.pending, (state) => {
                state.loading = true;
                state.errorMsg = "";
            })
            .addCase(searchNoteRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.userNotes = action.payload;
                state.errorMsg = "";
            })
            .addCase(searchNoteRequest.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload.errorMsg || "Something Went Wrong..!";
            })
    },
});

export default notes.reducer;
