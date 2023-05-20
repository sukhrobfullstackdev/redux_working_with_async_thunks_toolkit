import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserById} from "../store/slices/usersSlice";
import {selectAllPosts, selectPostsByUserId} from "../store/slices/postsSlice";

const UserPage = () => {
    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));
    const postsOfCurrentUser = useSelector(state => selectPostsByUserId(state, Number(userId)));
    const postTitles = postsOfCurrentUser.map(({id, title}) => (
        <li key={id}>
            <Link to={`/post/${id}`}>{title}</Link>
        </li>
    ))
    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>{postTitles}</ol>
        </section>
    );
};

export default UserPage;