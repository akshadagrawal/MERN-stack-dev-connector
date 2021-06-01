import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { logout_user } from '../../redux/ducks/auth';
import { clear_current_profile } from '../../redux/ducks/profile';
const  Navbar=()=> {
    const dispatch = useDispatch();
    const {isAuthenticated,user} = useSelector(state=> state.auth);
    const history= useHistory();

    const handleLogoutClick=(e)=>{
        e.preventDefault();
        dispatch(logout_user());
        dispatch(clear_current_profile());
        history.push('/');
    }

    const guestLinks= (
        <>
             <li><Link to="/register"  style={{textDecoration:"none"}}>Register</Link></li>
             <li><Link to="/login"  style={{textDecoration:"none"}}>Login</Link></li>
        </>
    )
              

    const authLinks=(
        <>
             <li><Link to="/feed"  style={{textDecoration:"none"}}>Post feed</Link></li>
            <li><Link to="/dashboard"  style={{textDecoration:"none"}}>Dashboard</Link></li>
            <li>
                <Link
                    
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
                </Link>
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
