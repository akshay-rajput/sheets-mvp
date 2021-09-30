import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    rules: [],
};

export const homeSlice = createSlice({
    name: "sheetData",
    initialState,
    reducers: {
        setupData: (state, action) => {
            state.data = action.payload;
        },

        addRule: (state, action) => {
            state.rules.push(action.payload);
        },
        removeRule: (state, action) => {
            // console.log("payload: ", action.payload);
            state.rules = state.rules.filter(
                (rule) => rule.id !== action.payload.id
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { setupData, addRule, removeRule } = homeSlice.actions;

export default homeSlice.reducer;
