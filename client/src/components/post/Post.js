import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { get_post } from '../../redux/ducks/posts';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';

const Post = (props) => {       


    const dispatch = useDispatch();
    const id= props.match.params.id;

    const {post,loading}  = useSelector(state=> state.post);

    useEffect(()=>{
        dispatch(get_post(id)); 
// eslint-disable-next-line
    },[dispatch]);

    const comments=  post.comments;
    

    let postContent;
    if(post== null ||loading || Object.keys(post).length === 0){
        postContent= <Spinner/>
    }
    else {
        postContent=<div>
             <PostItem post= {post} showActions={false}/>
             <CommentForm postId= {post._id}/>
            {

             comments.map(comment=> (
                 <PostItem post= {comment} showActions={false} />
            ))
            }
        </div>
    }

    return (
    <section >
        <Link to="/feed" className="btn">Back To Posts</Link>
        {postContent}
    </section>
    )
}

export default Post
