import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { get_profile_by_handle } from '../../redux/ducks/profile';
import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import { Link } from 'react-router-dom';


const Profile = () => {
    const history= useHistory();
    
    const params= useParams();
    const {profile,loading}=useSelector(state=> state.profile);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(params.handle){
            dispatch(get_profile_by_handle(params.handle));
        }
        // eslint-disable-next-line
    },[dispatch]);

    useEffect(()=>{
        if(profile==null || loading){
            history.push('/not-found');
        }
   // eslint-disable-next-line
    },[profile])
    
    let profilecontent;
    if(profile==null || loading){
        profilecontent=<Spinner/>           
    }
    else {
        profilecontent=(
            <>
                <Link  to="/profiles" class="btn btn-light">Back To Profiles</Link>
                
                <div class="profile-grid my-1">
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds education= {profile.education} experience= {profile.experience}/>
                    {profile.githubusername ? (<ProfileGithub username= {profile.githubusername} />) : null}

                </div>
            </>
        )
    }
    
    
   
    return (
        <>
                <section >
                {profilecontent}
                </section>
          
        </>
    )
}

export default Profile






















