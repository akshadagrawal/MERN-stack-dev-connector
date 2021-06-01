import React from 'react';
import { Link} from 'react-router-dom';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { delete_post, like_post, unlike_post } from '../../redux/ducks/posts';


const PostItem = ({post, showActions}) => {
    const user= useSelector(state=> state.auth.user)

    const dispatch= useDispatch();

    const handleDelete=(id)=>{
        dispatch(delete_post(id));
       
    }
    const handleLike=(id)=>{
        dispatch(like_post(id));
    }
    const handleUnlike=(id)=>{
        dispatch(unlike_post(id));
    }
    const findUserLike=(likes)=>{
        if(likes.filter(like=> like.user === user.id).length >0) return true;
        else  return false;
    }

    return (
        <div className="posts">
            <div className="post bg-white p-1 my-1">
            <div>
                <Link to="/profile" style= {{textDecoration: "none"}}>
                <img
                    className="round-img"
                    src={post.avatar}
                    alt=""
                />
                <h5>{post.name}</h5>
                </Link>
            </div>
            <div>
                <p className="my-1">
                {post.text}  
                </p>
                <p className="post-date">
                    Posted on {<Moment format="YYYY/MM/DD">{post.date}</Moment>}
                </p>
                {showActions ? (<span>
                    <button type="button" className="btn btn-light" onClick= {()=>handleLike(post._id)}>
                <i className={classnames('fas fa-thumbs-up', {
                    'text-info' : findUserLike(post.likes)
                })}></i>
                <span>{post.likes.length}</span>
                </button>  
                <button type="button" className="btn btn-light" onClick= {()=>handleUnlike(post._id)}>
                <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-primary">
                 Discussion <span className='comment-count'>{post.comments.length}</span>
                </Link>

                {post.user=== user.id ?(
                     <button      
                     type="button"
                     className="btn btn-danger"
                     onClick= {()=>handleDelete(post._id)}
                     >
                     <i className="fas fa-times"></i>
                 </button>
                ) : null} 
                </span>): null}
               
            </div>
            </div>
    </div>
    )
}

export default PostItem
