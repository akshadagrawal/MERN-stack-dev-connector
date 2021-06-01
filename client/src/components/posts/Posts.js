import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_posts } from '../../redux/ducks/posts';
import PostForm from './PostForm';
import Spinner  from "../common/Spinner";
import PostFeed from './PostFeed';


const Posts = () => {
    const post = useSelector(state=> state.post);
    const  dispatch= useDispatch();



    useEffect(()=>{     
        dispatch(get_posts()); 
    },[dispatch])       ;
    
    let postContent;
    
    const {posts, loading} = post;

    if(posts== null || loading){
         postContent = <Spinner/>
    }else {
        postContent= <PostFeed posts= {posts} />
    }
    return (
        <>
             <section >
                <h1 className="large text-primary">
                    Posts
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

               <PostForm/>
               {postContent}
            </section> 
        </>
    )
}

export default Posts;
