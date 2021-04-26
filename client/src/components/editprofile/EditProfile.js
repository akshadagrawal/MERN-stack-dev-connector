import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { create_profile, get_current_profile } from '../../redux/ducks/profile';
import isEmpty from '../../redux/ducks/validations/isEmpty';


const EditProfile = () => {

    const history= useHistory();
    const dispatch= useDispatch();
    const [temp,setTemp]= useState(0);

    const [profile, setProfile]= useState({
        handle: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        status: '',
        githubusername: '',
        bio: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        facebook: '',
        youtube: '',
    }); 

    const errors= useSelector(state=> state.errors);
    const [displaySocialInputs, setdisplaySocialInputs]= useState(false );
    const currentProfile= useSelector(state=> state.profile.profile);


    useEffect(()=>{
        dispatch(get_current_profile());
       
    },[dispatch]);

    if(currentProfile && temp=== 0){
        const newProfile={
            handle: '',
            company: '',
            website: '',
            location: '',
            skills: '',
            status: '',
            githubusername: '',
            bio: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            facebook: '',
            youtube: ''
        };

       const  skillsCSV = currentProfile.skills.join(',');
       newProfile.handle= currentProfile.handle;
       newProfile.status= currentProfile.status;
       newProfile.skills= skillsCSV;

       newProfile.company= !isEmpty(currentProfile.company) ? currentProfile.company : '';
       newProfile.website= !isEmpty(currentProfile.website) ? currentProfile.website : '';
       newProfile.location= !isEmpty(currentProfile.location) ? currentProfile.location : '';
       newProfile.githubusername= !isEmpty(currentProfile.githubusername) ? currentProfile.githubusername : '';
       newProfile.bio= !isEmpty(currentProfile.bio) ? currentProfile.bio : '';
       newProfile.youtube= !isEmpty(currentProfile.social.youtube) ? currentProfile.social.youtube : '';
       newProfile.linkedin= !isEmpty(currentProfile.social.linkedin) ? currentProfile.social.linkedin : '';
       newProfile.instagram= !isEmpty(currentProfile.social.instagram) ? currentProfile.social.instagram : '';
       newProfile.facebook= !isEmpty(currentProfile.social.facebook) ? currentProfile.social.facebook : '';
       newProfile.twitter= !isEmpty(currentProfile.social.twitter) ? currentProfile.social.twitter : '';


       setTemp(1);
       setProfile(newProfile);

    }

    

    const handleChange=(e)=>{
        setProfile({
            ...profile,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        dispatch(create_profile(profile,history));     
     };

    return (
        <>
             <section className="container">
                <h1 className="large text-primary">
                    Edit Your Profile
                </h1>
               
                <small>* = required field</small>
                <form noValidate className="form" onSubmit= {handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Handle" 
                            name="handle" 
                            value={profile.handle}
                            onChange={handleChange}
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.handle} )}
                        />
                        {errors.handle && (<div className= "invalid-feedback">{errors.handle}</div>)}
                        <small className="form-text"
                            >A unique handle for your profile</small
                        >
                    </div>

                    <div className="form-group">
                        <select 
                            name="status"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.status} )}
                            value={profile.status}
                            onChange={handleChange}

                        >
                            <option value="0">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.status && (<div className= "invalid-feedback">{errors.status}</div>)}

                        <small className="form-text"
                            >Give us an idea of where you are at in your career</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Company" 
                            name="company" 
                            value={profile.company}
                            onChange={handleChange}
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.company} )}
                      />
                        {errors.company && (<div className= "invalid-feedback">{errors.company}</div>)}
                        <small className="form-text"
                            >Could be your own company or one you work for</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Website" 
                            name="website" 
                            value={profile.website}
                            onChange={handleChange}
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.website} )}
                      />
                     {errors.website && (<div className= "invalid-feedback">{errors.website}</div>)}

                        <small className="form-text"
                            >Could be your own or a company website</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Location"
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.location} )}
                      />
                     {errors.location && (<div className= "invalid-feedback">{errors.location}</div>)}

                    <small className="form-text"
                        >City & state suggested (eg. Boston, MA)</small
                    >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Skills"
                            name="skills" 
                            value={profile.skills}
                            onChange={handleChange}
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.skills} )}
                      />
                    {errors.skills && (<div className= "invalid-feedback">{errors.skills}</div>)}

                    <small className="form-text"
                        >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Github Username"
                            name="githubusername"
                            value={profile.githubusername}
                            onChange={handleChange}
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.githubusername} )}
                      />
                    {errors.githubusername && (<div className= "invalid-feedback">{errors.githubusername}</div>)}

                    <small className="form-text"
                        >If you want your latest repos and a Github link, include your
                        username</small
                    >
                    </div>
                    <div className="form-group">
                        <textarea
                          placeholder="A short bio of yourself"
                          name="bio"
                          onChange={handleChange}
                          className={classnames("form-control form-control-lg", {"is-invalid":errors.bio} )}
                        value={profile.bio}
                        ></textarea>
                        {errors.bio && (<div className= "invalid-feedback">{errors.bio}</div>)}

                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                    <button
                         type="button" 
                         className="btn btn-light"
                         onClick={()=>{
                             setdisplaySocialInputs(!displaySocialInputs);
                         }}
                         
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                    </div>

                    {displaySocialInputs && ( 
                        <>
                        <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input 
                                    type="text"
                                    placeholder="Twitter URL" 
                                    name="twitter" 
                                    onChange={handleChange}
                                    className={classnames("form-control form-control-lg", {"is-invalid":errors.twitter} )}
                                    value={profile.twitter}                            
                                />
                                {errors.twitter && (<div className= "invalid-feedback">{errors.twitter}</div>)}

                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input 
                                    type="text"
                                    placeholder="Facebook URL"
                                    name="facebook"
                                    onChange={handleChange}
                                    className={classnames("form-control form-control-lg", {"is-invalid":errors.facebook} )}
                                    value={profile.facebook}
                                />
                                {errors.facebook && (<div className= "invalid-feedback">{errors.name}</div>)}

                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input 
                                    type="text"
                                    placeholder="YouTube URL" 
                                    name="youtube" 
                                    onChange={handleChange}
                                    className={classnames("form-control form-control-lg", {"is-invalid":errors.youtube} )}
                                value={profile.youtube}
                                />
                                {errors.youtube && (<div className= "invalid-feedback">{errors.youtube}</div>)}

                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input 
                                    type="text"
                                    placeholder="Linkedin URL"
                                    name="linkedin"
                                    onChange={handleChange}
                                    className={classnames("form-control form-control-lg", {"is-invalid":errors.linkedin} )}
                                value={profile.linkedin}
                                />
                                    {errors.linkedin && (<div className= "invalid-feedback">{errors.linkedin}</div>)}

                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input 
                                    type="text"
                                    placeholder="Instagram URL"
                                    name="instagram"
                                    onChange={handleChange}
                                    className={classnames("form-control form-control-lg", {"is-invalid":errors.instagram} )}
                                value={profile.instagram}
                                />
                                {errors.instagram && (<div className= "invalid-feedback">{errors.instagram}</div>)}
                            </div>
                        </>
                    )} 
                        <input 
                            type="submit"
                            className="btn btn-primary m-1" 
                        />
            
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                    </form>
             </section>
        </>
    )
}

export default EditProfile
