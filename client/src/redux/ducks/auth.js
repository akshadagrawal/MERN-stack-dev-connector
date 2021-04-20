import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS } from "./errors";
import jwt_decode from 'jwt-decode';
import isEmpty from "./validations/isEmpty";
export const REGISTER_USER = 'register_user';
export const LOGIN_USER= 'login_user';
export const SET_USER= 'set_user';


const initialState= {
    isAuthenticated: false,
    user: {}
}

export const register_user=(userData, history)=>dispatch=>{
    axios.post('/api/users/register',userData) 
        .then(res=> {
            history.push('/login');
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const login_user= (userData )=> dispatch=>{
    axios.post('/api/users/login', userData)
        .then(res=>{
            //Save to local Storage
            const {token} = res.data;

            //Set item to local Storage
            localStorage.setItem('jwtToken', token);

            //Set token to Auth header
            setAuthToken(token);

            //Decode token to get user data
            const decoded= jwt_decode(token);

            //Set current user
            dispatch({
                type: SET_USER,
                payload: decoded
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const set_user = (user)=>{
    return{
        type: SET_USER,
        payload: user
    }
}

export const logout_user= ()=> dispatch=>{
     //Remove the auth tken
     localStorage.removeItem('jwtToken');

     //Remove the header for future requests
     setAuthToken(false);

     //set current user to emprty object and set autheticated=false
     dispatch(set_user({})); 
}

const authReducer = (state=initialState, action)=>{
    switch(action.type){

        case SET_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        

        default: 
            return state
    }
};

export default authReducer;