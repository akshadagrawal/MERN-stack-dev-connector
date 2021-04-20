import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { logout_user } from '../../redux/ducks/auth';
const  Navbar=()=> {
    const dispatch = useDispatch();
    const {isAuthenticated,user} = useSelector(state=> state.auth);

    const handleLogoutClick=(e)=>{
        e.preventDefault();
        dispatch(logout_user());
    }

    const guestLinks= (
        <>
             <li><Link to="/register"  style={{textDecoration:"none"}}>Register</Link></li>
             <li><Link to="/login"  style={{textDecoration:"none"}}>Login</Link></li>
        </>
    )

    const authLinks=(
        <>
            <li>
                <a 
                  href="#"
                  onClick={handleLogoutClick}
                  style={{textDecoration:"none"}}
                ><img 
                  src={user.avatar} 
                  alt={user.name} 
                  title="You must have a Gravatar connecte to your email"
                  style={{width: "25px", marginRight: "5px"}} 
                  className="rounded-circle"
                  />
                  Logout
                </a>
            </li>    
        </>
    )

    return (
        <>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"  style={{textDecoration:"none"}}><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                <ul>
                    <li><Link to="/profiles"  style={{textDecoration:"none"}}>Developers</Link></li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
                
            </nav>
        </>
    )
}

export default Navbar;
