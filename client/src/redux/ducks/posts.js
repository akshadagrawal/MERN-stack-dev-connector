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


const initialState= {
    posts:[],
    post: {},
    loading : false
}

const  postReducer= (state= initialState,  action)=>{
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                post: action.payload
            }
        default:
            return state;
    }
}

export default postReducer;