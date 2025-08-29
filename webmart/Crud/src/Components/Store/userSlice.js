import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    email: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
        },
        updateUser: (state, action) => {
            if (action.payload.name) state.name = action.payload.name;
            if (action.payload.email) state.email = action.payload.email;
        }
    },
});

export const { setUser, clearUser ,updateUser  } = userSlice.actions;
export default userSlice.reducer;
