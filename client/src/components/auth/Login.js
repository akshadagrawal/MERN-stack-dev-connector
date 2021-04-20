import classNames from 'classnames';
import {React, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login_user } from '../../redux/ducks/auth';

const Login=()=> {

    const history= useHistory();
    const dispatch = useDispatch();
    const errors= useSelector(state=> state.errors);
    const isAuthenticated=  useSelector(state=> state.auth.isAuthenticated);
    if(isAuthenticated)  history.push('/dashboard'); 


    const [user,setUser]= useState({
        email:'',
        password:''
       
    });

    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value 
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login_user(user));
     }

    return (
        <>
              <section className="container">
                {errors.email === 'User not found' && ( <div class="alert alert-danger">
                        Invalid credentials
                </div>)}
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form noValidate className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className={classNames("form-control form-control-lg", {"is-invalid":errors.email} )}
                            name="email"
                            onChange={handleChange}
                        />
                        {errors.email && (<div className= "invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classNames("form-control form-control-lg", {"is-invalid":errors.password} )}
                            name="password"
                            onChange={handleChange}
                        />
                        {errors.password && (<div className= "invalid-feedback">{errors.password}</div>)}
                
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
        </section>
        </>
    )
}

export default Login
