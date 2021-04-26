import React from 'react'
import isEmpty from '../../redux/ducks/validations/isEmpty';

const ProfileAbout = ({profile}) => {

    //get first name
    const firstname= profile.user.name.trim().split(' ')[0];
    //skill list

    const skills = profile.skills.map((skill, index) =>(
        <div className="p-1" key={index}><i className="fa fa-check"></i>{skill}</div>

    ));
    return (
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{firstname}'s Bio</h2>
          <p>
            {isEmpty(profile.bio) ? `${firstname} does not have a bio` : profile.bio}
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {skills}
          </div>
        </div>
    )


}

export default ProfileAbout
