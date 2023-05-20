import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../store/slices/postsSlice";
import {selectAllUsers} from "../store/slices/usersSlice";
import {useNavigate} from "react-router-dom";

const AddPostForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [content, setContent] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }
    const onContentChanged = (e) => {
        setContent(e.target.value);
    }
    const onAuthorChanged = (e) => {
        setUserId(e.target.value);
    }
    const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle';
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addPost({title, body: content, userId})).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            }catch (e) {
                console.error('Failed to save the post', e);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    }
    const userOptions = users.map(user => (
        <option value={user.id} key={user.id}>{user.name}</option>
    ))
    return (
        <section>
            <h2>Add a new post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged}/>
                <label htmlFor="postAuthor">Author:</label>
                <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value="">Choose an author!</option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}/>
                <button onClick={onSavePostClicked} type="button" disabled={!canSave}>Save Post!</button>
            </form>
        </section>
    );
};

export {AddPostForm};