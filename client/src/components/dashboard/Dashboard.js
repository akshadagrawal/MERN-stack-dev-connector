import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { delete_account, get_current_profile } from '../../redux/ducks/profile';
import Spinner from '../common/Spinner';
import Education from './Education';
import Experience from './Experience';
import ProfileActions from './ProfileActions';

const Dashboard=()=> {
    const dispatch= useDispatch();
    const {profile,loading}= useSelector(state=> state.profile);
    const {user}= useSelector(state=> state.auth);

    const handleClick=(e)=>{
        dispatch(delete_account());
    }


    let dashboardContent;
    if(profile==null ||loading){
        dashboardContent = <> <Spinner/></>
    }else{
        // chck if logged in has a profile
        if(Object.keys(profile).length > 0){
            dashboardContent = (
                <div>      
                    <p className="lead"><i className="fas fa-user"></i> Welcome  <Link to={`/profile/${profile.handle}`}>{user.name}</Link> </p>                        
                    <ProfileActions/>
                    {profile.experience.length !==0 && (<Experience experienceArray= {profile.experience}/>)}
                    {profile.education.length !==0 && (<Education educationArray= {profile.education}/> )}

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={handleClick}>
                            <i className="fas fa-user-minus"></i>

                             Delete My Account
                        </button>
                    </div>
                </div>
            )
        }
        else {
                //user is logged in but has no profile
                dashboardContent=(
                    <div>
                        <p className="lead"><i className="fas fa-user"></i> Welcome {user.name}</p>                        
                        <p style={{fontSize:"20px"}}>You have not setup a profile yet, please add some info</p>
                        <Link to="/create-profile" className="btn-lg btn-info" style={{textDecoration:"none"}}>Create Profile</Link>
                    </div>
                )
        }
    }

    useEffect(()=>{
        dispatch(get_current_profile());
    },[dispatch])
    
    return (
        <div>
           <h1 className="large text-primary">
                 Dashboard
            </h1>
            <h1>{dashboardContent}</h1>
        </div>
    )
}

export default Dashboard;
