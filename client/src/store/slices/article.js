import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

// const API_URL = import.meta.env.VITE_API_URL;

const fetchArticles = createAsyncThunk("article/fetchArticles", async () => {
    const response = await fetch("/api/v1/app/article");
    const data = await response.json();
    
    return data;
});

const initialState = {
    list: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "article",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export { fetchArticles };
export default userSlice.reducer;
