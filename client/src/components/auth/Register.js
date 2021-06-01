import React, { useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import { register_user } from '../../redux/ducks/auth';

const Register=()=> {


    const history= useHistory();
    const dispatch= useDispatch();
    
    const isAuthenticated=  useSelector(state=> state.auth.isAuthenticated);
    if(isAuthenticated)  history.push('/dashboard'); 
 

    const [user,setUser]= useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const errors= useSelector(state=> state.errors);


    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value 
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(register_user(user, history));
        
     };

    return (
        <>
            <section >
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form noValidate className="form" onSubmit= {handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.name} )}
                            name="name" 
                            value={user.name}    
                            onChange= {handleChange}
                        />
                        {errors.name && (<div className= "invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.email})}
                            name="email" 
                            value={user.email}
                            onChange= {handleChange}

                        />
                         {errors.email && (<div className= "invalid-feedback">{errors.email}</div>)}

                        <small className="form-text"
                            >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >

                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.password})}
                            name="password"
                            value={user.password}
                            onChange= {handleChange}

                        />
                       {errors.password && (<div className= "invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.password2})}
                            name="password2"
                            value={user.password2}
                            onChange= {handleChange}

                        />
                        {errors.password2 && (<div className= "invalid-feedback">{errors.password2}</div>)}

                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </>
    );
};

export default withRouter(Register);
 