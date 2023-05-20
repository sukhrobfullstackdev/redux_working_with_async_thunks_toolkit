import React from 'react';
import {PostsList, AddPostForm,EditPostForm} from "./components";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./layout/Layout";
import SinglePostPage from "./components/SinglePostPage";
import UsersList from "./components/UsersList";
import UserPage from "./components/UserPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}/>
            <Route index element={<PostsList/>}/>
            <Route path="post">
                <Route index element={<AddPostForm/>}/>
                <Route path=":postId" element={<SinglePostPage/>}/>
                <Route path="edit/:postId" element={<EditPostForm />} />
            </Route>
            <Route path="user">
                <Route index element={<UsersList/>}/>
                <Route path=":userId" element={<UserPage/>}/>
                {/*<Route path="edit/:postId" element={<EditPostForm />} />*/}
            </Route>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
};

export default App;