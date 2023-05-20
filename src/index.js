import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {store} from "./store";
import "./index.css";
import {getUsers} from "./store/slices/usersSlice";
import {getPosts} from "./store/slices/postsSlice";
import Layout from "./layout/Layout";

store.dispatch(getUsers());
store.dispatch(getPosts());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </Layout>
        </Router>
    </Provider>
);
