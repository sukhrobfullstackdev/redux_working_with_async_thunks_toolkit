import React from 'react';
import {ReactionButtons, PostAuthor, TimeAgo} from "../components/index";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostById} from "../store/slices/postsSlice";


const PostsExcerpt = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId));
    return (
        <article key={post.id}>
            <h2>{post.title}</h2>
            <p className="excerpt">{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
    );
};
// PostsExcerpt = React.memo(PostsExcerpt); // emoji qoyganda PostsList ga qoshib hamma 100 PostExcerpt lar ham render bovoti, shunga memo orqali shuni oldini oldik!
// component let bolish kere
export {PostsExcerpt};