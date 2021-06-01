import React from 'react';
import Moment from 'react-moment';

const ProfileCreds = ({experience,education}) => {

    const expItems= experience.map(exp =>(
        <div key= {exp._id}>
            <h3 className="text-dark">{exp.company}</h3>
            <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> - { exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment>: "Ongoing"}</p>
            <p><strong>Position: </strong>{exp.title}</p>
         {exp.location ? (<p><strong>Location: </strong> {exp.location}</p> ) :(null) }
  
         {exp.description ? (<p><strong>Description: </strong> {exp.description}</p> ) :(null) }
      </div>
    ))

    const eduItems= education.map(edu =>(
        <div key= {edu._id}>
            <h3 className="text-dark">{edu.school}</h3>
            <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> - { edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment>: "Ongoing"}</p>
            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field Of study: </strong> {edu.fieldofstudy}</p>
  
         {edu.description ? (<p><strong>Description: </strong> {edu.description}</p> ) :(null) }
      </div>
    ))



    return (
        <>
            <div className="profile-exp bg-white p-2 text-center text-info">
                <h2 className="text-primary">Experience</h2>
                <div>
                    <ul className="text-center text-info">{expItems}</ul>
                </div>
            </div>

             <div className="profile-edu bg-white p-2 text-center text-info">
                <h2 className="text-primary">Education</h2>
                <div>
                    <ul className="text-center text-info">{eduItems}</ul>
                </div>
             </div>

        </>
    )
}

export default ProfileCreds
