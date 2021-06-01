import React from 'react'
import { useSelector } from 'react-redux';

import { Redirect,Route} from 'react-router';

const PrivateRoute = ({path, component : Component, ...rest}) => {

    const auth= useSelector(state=> state.auth);
    
    return (
        <Route
        path= {path}       
        render= {props=> 
        auth.isAuthenticated === true ? (
            <Component  {...props}/>
        ) : (
            <Redirect to ="/login" />
        )
    }
    />
    );
}

export default PrivateRoute;
