import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

const Landing=() =>{

    const history= useHistory();
    const dispatch= useDispatch();
    
    const isAuthenticated=  useSelector(state=> state.auth.isAuthenticated);
    if(isAuthenticated)  history.push('/dashboard'); 
 
    return (
        <>
             <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing
