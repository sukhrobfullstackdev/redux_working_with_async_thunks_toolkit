import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectPostIds, getStatus, getError} from "../store/slices/postsSlice";
import {PostsExcerpt} from "../components/index";

const PostsList = () => {
    const orderedPostIds = useSelector(selectPostIds);
    const status = useSelector(getStatus);
    const error = useSelector(getError);
    let content;
    if (status === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (status === 'succeeded') {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId}/>);
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }
    return (
        <section>
            {content}
        </section>
    );
};

export {PostsList};