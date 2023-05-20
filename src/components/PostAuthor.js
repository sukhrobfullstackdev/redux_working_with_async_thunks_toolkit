import React from 'react';
import {useSelector} from "react-redux";
import {selectAllUsers} from "../store/slices/usersSlice";

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers);
    const author = users.find(user => user.id === userId);
    return <span>by {author ? author.name : "Unknown author"}</span>
};

export {PostAuthor};