import axios from 'axios';

const setAuthToken= (token)=>{
    if(token) {

        //Aply to every request
        axios.defaults.headers.common['Authorizaton']= token;
    }else {

        //Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;