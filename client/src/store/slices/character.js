import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Pour utiliser une variable d'environnement, il faut utiliser import.meta.env.VITE_NOM_DE_LA_VARIABLE
// const API_URL = import.meta.env.VITE_API_URL;

const fetchCharacters = createAsyncThunk(
    "character/fetchCharacters",
    async () => {
        const response = await fetch(
            "/api/v1/app/character"
        );
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    loading: false,
    error: null,
};

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export { fetchCharacters };
export default characterSlice.reducer;
