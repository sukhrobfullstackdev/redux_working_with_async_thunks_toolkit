import {configureStore} from "@reduxjs/toolkit";
import {postsSlice} from "./slices/postsSlice";
import {usersSlice} from "./slices/usersSlice";

export const store = configureStore({
    reducer: {
        postsReducer: postsSlice.reducer,
        usersReducer: usersSlice.reducer
    }
})