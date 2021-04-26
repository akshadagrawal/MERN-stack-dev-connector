import axios from 'axios';
import { SET_USER } from './auth';
import { GET_ERRORS } from './errors';
export const GET_PROFILE= "get_profile";
export const GET_PROFILES= "get_profiles";
export const PROFILE_LOADING='profile_loading';
export const PROFILE_NOT_FOUND='profile_not_found';
export const CLEAR_CURRENT_PROFILE='clear_current_profile';

//Set profile loading
export const set_profile_loading=()=>{
    return {
        type: PROFILE_LOADING
    }
}

//Clear Profile
export const clear_current_profile=()=>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

//Create profile
export const create_profile=(profile, history) => dispatch=>{
    axios.post('/api/profile', profile)
        .then(res=>{
            history.push('/dashboard');
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload : err.response.data
            })
        })
}



//Get current profile
export const get_current_profile=()=>dispatch=>{
    dispatch(set_profile_loading());
    axios.get('/api/profile')
        .then((res)=>{
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}
//Get profile by handle
export const get_profile_by_handle=(handle)=>dispatch=>{
    dispatch(set_profile_loading());
    axios.get(`/api/profile/handle/${handle}`)
        .then((res)=>{
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        })
}

//Add experience details
export const add_experience=(exp_data,history)=>dispatch=>{
    axios.post('/api/profile/experience',exp_data)
    .then(()=>{
        history.push('/dashboard');
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Add education details
export const add_education=(edu_data,history)=>dispatch=>{
    axios.post('/api/profile/education',edu_data)
    .then(()=>{
        history.push('/dashboard');
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Delete education
export const delete_education=(id)=>dispatch=>{
    axios.delete(`/api/profile/education/${id}`)
    .then((res)=>{
        dispatch({
            type: GET_PROFILE,
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


//Delete experience
export const delete_experience=(exp_id)=>dispatch=>{
    axios.delete(`/api/profile/experience/${exp_id}`)
    .then((res)=>{
        dispatch({
            type: GET_PROFILE,
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



//Get all profiles
export const get_profiles=()=>dispatch=>{
    dispatch(set_profile_loading());
    axios.get('/api/profile/all')
        .then((res)=>{
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type: GET_PROFILES,
                payload: {}
            })
        })
}

//delete account

export const delete_account=()=>dispatch=>{
    if(window.confirm('Are you sure? This can not be undone!!'));
    axios.delete('/api/profile')
    .then(res=>{
        dispatch({
            type:SET_USER,
            payload:{}
        })
    })
    .catch(err=>dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

const initialState={
    profile: null,
    profiles: null,
    loading : false,

}

const profileReducer= (state = initialState, action)=>{
    
    switch(action.type){

        case PROFILE_LOADING:
            return{
                ...state,
                loading: true
            }
        case CLEAR_CURRENT_PROFILE:
            return{
                ...state,
                profile: null
            }
        case  GET_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading: false
            }
        case  GET_PROFILES:
            return{
                ...state,
                profiles: action.payload,
                loading: false
            }
        default :
         return state;
    }

}

export default profileReducer;