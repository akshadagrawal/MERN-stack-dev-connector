import React from 'react'
import { Link } from 'react-router-dom'
import isEmpty from '../../redux/ducks/validations/isEmpty'

const Profileitem = ({profile}) => {

   
    return (
        <>
         <div className="profile bg-light">
          <img
            className="round-img"
            src={profile.user.avatar}
            alt="" 
            
          />
          <div>
            <h2>{profile.user.name}</h2>
            <p>{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
            <p>{isEmpty(profile.location) ? null : profile.location }</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-primary">View Profile</Link>
          </div>

          <ul>
              <li>Skills</li>  
              {profile.skills.slice(0,4).map((skill,index)=>(
                    <li key={index} className="text-primary">
                     <i className="fas fa-check"></i> {skill}
                   </li>
              ))}
           
            
          </ul>
        </div>
    </>
    )
}

export default Profileitem
