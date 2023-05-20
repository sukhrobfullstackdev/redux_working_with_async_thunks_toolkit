import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const initialState = [];
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const res = await axios.get(USERS_URL);
    return res.data;
})
export const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});
export const selectAllUsers = (state) => state.usersReducer;
export const selectUserById = (state, userId) => state.usersReducer.find(user => user.id === userId)