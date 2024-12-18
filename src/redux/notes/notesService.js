import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";



export const getUserNotes = createAsyncThunk(
    "note/getUserNotes",
    async (data, thunkAPI) => {
        try {
            const { userId } = data;
            const response = await axiosInstance.get(`/note/get-all-notes/${userId}`);

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const createNewNoteRequest = createAsyncThunk(
    "note/create-new",
    async (data, thunkAPI) => {
        const { title, content, tags, userId, callback } = data;
        try {
            const response = await axiosInstance.post(`/note/create-note`, { title: title, content: content, tags: tags, userId: userId });
            if (response.status === 201) {
                callback();
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const editNoteRequest = createAsyncThunk(
    "note/update",
    async (data, thunkAPI) => {
        const { noteId, title, content, tags, userId, callback } = data;
        try {
            const response = await axiosInstance.put(`/note/update/${noteId}`, { title: title, content: content, tags: tags, userId: userId });
            if (response.status === 200) {
                callback();
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

// export const editNoteRequest = createAsyncThunk(
//     "note/update",
//     async (data, thunkAPI) => {
//         const { noteId, title, content, tags, userId, callback } = data;
//         try {
//             const response = await axiosInstance.put(`/note/update/${noteId}`, { title: title, content: content, tage: tags, userId: userId });
//             if (response.status === 200) {
//                 callback();
//             }
//             return response.data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.error);
//         }
//     }
// );

export const pinNoteRequest = createAsyncThunk(
    "note/pinned",
    async (data, thunkAPI) => {
        const { noteId, isPinned, callback } = data;
        try {
            const response = await axiosInstance.put(`note/pin/${noteId}`, { isPinned: isPinned });
            if (response.status === 200) {
                callback();
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const searchNoteRequest = createAsyncThunk(
    "note/search",
    async (data, thunkAPI) => {
        const { query, userId } = data;
        try {
            const response = await axiosInstance.get(`note/${userId}/search`, {
                params: { query },
                data: {}
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const deleteNoteRequest = createAsyncThunk(
    "note/delete/",
    async (data, thunkAPI) => {
        const { noteId, callback } = data;
        try {
            const response = await axiosInstance.delete(`note/delete/${noteId}`);
            if (response.status === 204) {
                callback();
            }
            // return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);


