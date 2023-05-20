import {createSlice, createAsyncThunk, createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
export const postsAdapter = createEntityAdapter({ // data ni sort qilip posts arrayini qoshib beradi
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});
const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null,
    count: 0
});
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const res = await axios.get(POSTS_URL);
    return res.data;
});
export const addPost = createAsyncThunk('posts/addPost', async (initialPost) => {
    const res = await axios.post(POSTS_URL, initialPost);
    return res.data;
});
export const editPost = createAsyncThunk('posts/editPost', async (initialPost) => {
    const {id} = initialPost;
    const res = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return res.data;
});
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const {id} = initialPost;
    const res = await axios.delete(`${POSTS_URL}/${id}`);
    if (res?.status === 200) return initialPost;
    return `${res?.status}: ${res?.statusText}`;
});
export const postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    reducers: {
        addReaction(state, action) {
            const {postId, reaction} = action.payload;
            const existingPost = state.entities[postId];
            if (existingPost) existingPost.reactions[reaction]++;
        },
        increaseCount(state) {
            state.count = state.count + 1;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                // state.posts = state.posts.concat(loadedPosts);
                postsAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                // state.posts.push(action.payload);
                postsAdapter.addOne(state, action.payload);
            })
            .addCase(editPost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log(`Update could not complete!`);
                    console.log(action.payload);
                    return;
                }
                action.payload.date = new Date().toISOString();
                // state.posts = [...posts, action.payload];
                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Delete could not complete!");
                    console.log(action.payload);
                    return;
                }
                const {id} = action.payload;
                postsAdapter.removeOne(state, id);
            })
    }
});
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.postsReducer)
export const {addReaction, increaseCount} = postsSlice.actions;
// export const selectAllPosts = (state) => state.postsReducer.posts;
export const getStatus = (state) => state.postsReducer.status;
export const getCount = (state) => state.postsReducer.count;
export const getError = (state) => state.postsReducer.error;
// export const selectPostById = (state, postId) => state.postsReducer.posts.find(post => post.id === postId);
export const selectPostsByUserId = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)
