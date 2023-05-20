import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCount, increaseCount} from "../store/slices/postsSlice";

const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getCount);
    return (
        <header className="Header">
            <h1>SukhrobDev</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Posts</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
                <button onClick={()=>dispatch(increaseCount())}>{count}</button>
            </nav>
        </header>
    );
};

export {Header};