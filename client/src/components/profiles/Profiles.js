import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_profiles } from '../../redux/ducks/profile';
import Spinner from '../common/Spinner';
import Profileitem from './Profileitem';

const Profiles = () => {

    const {profiles, loading} =useSelector(state => state.profile);

    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(get_profiles()); 
    },[dispatch]);

    let profileItems;

    if(profiles== null || loading){
        profileItems= <Spinner />
    }else {
        if(profiles.length > 0){
            profileItems= profiles.map(profile=>(
                <Profileitem key={profile._id} profile={profile}/>
            ))
            
        }else{
            profileItems= <h4>No Profiles Found...</h4>
        }
       
    }


    return (
        <>
            <section>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profileItems}
                </div>
                
            </section>
        </>
    )
}

export default Profiles 
