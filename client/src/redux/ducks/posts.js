import axios from 'axios';
import { GET_ERRORS } from "./errors";
export const POST_LOADING= 'post_loading';
export const GET_POSTS = 'get_posts';
export const GET_POST = 'get_post';
export const ADD_POST = 'add_post';
export const DELETE_POST = 'delete_post';

//ADD post
export const add_post=(post)=>dispatch=>{
    axios.post('/api/posts', post)
        .then(res=>{
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//get Posts
export const get_posts=()=>dispatch=>{
    dispatch(set_post_loading());
    axios.get('/api/posts')
        .then(res=>{
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}
//get Post
export const get_post=(id)=>dispatch=>{
    dispatch(set_post_loading());
    axios.get(`/api/posts/${id}`)
        .then(res=>{
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}



//delete post

export const delete_post=(id)=>dispatch=>{
    axios.delete(`/api/posts/${id}`)
        .then(res=>{
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//Add like
export const like_post=(id)=>dispatch=>{
    axios.post(`/api/posts/like/${id}`)
        .then(res=>{
            dispatch(get_posts());
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//remove like
export const unlike_post=(id)=>dispatch=>{
    axios.post(`/api/posts/unlike/${id}`)
        .then(res=>{
            dispatch(get_posts());
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//ADD comment 
export const add_comment=(comment , postId)=>dispatch=>{
    axios.post(`/api/posts/comment/${postId}`,comment)
        .then(res=>{
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}




//set loading state
export const set_post_loading= ()=>{
    return {
        type: POST_LOADING
    }
}


const initialState= {
    posts:[],
    post: {},
    loading : false
}

const  postReducer= (state= initialState,  action)=>{
    switch(action.type){
        case POST_LOADING:
             return {
                 ...state,
                 loading: true
             }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case GET_POSTS:
            return {
               ...state,
               posts: action.payload,
               loading: false
            }
        case GET_POST:
            return {
                ...state,
                 post: action.payload,
                 loading: false
                }
        case DELETE_POST:  
        return {
            ...state,
            posts: state.posts.filter(post=> post._id !==action.payload)
        }
        default:
            return state;
    }
}

export default postReducer;