import React from 'react';
import {ReactionButtons, PostAuthor, TimeAgo} from "../components/index";
import {useSelector} from "react-redux";
import {selectPostById} from "../store/slices/postsSlice";
import {Link, useParams} from "react-router-dom";

const SinglePostPage = () => {
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, Number(postId)));
    if (!post) {
        return (
            <section>
                <h2>Post Not Found!</h2>
            </section>
        );
    }
    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <h3>{post.body.substring(0, 100)}</h3>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
    );
};

export default SinglePostPage;