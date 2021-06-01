import React from 'react'
import PostItem from './PostItem'

const PostFeed = ({posts}) => {

   


    return (
        <>
             {
                    posts.map(post=>(
                        <PostItem key= {post._id} post={post} showActions={true}/>
                    ))
                }
        </>
    )
}

export default PostFeed
