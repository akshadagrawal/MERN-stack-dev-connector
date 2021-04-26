import React from 'react'
import Moment from 'react-moment';  
import {useDispatch } from 'react-redux';   
import { delete_experience } from '../../redux/ducks/profile';

const Experience = ({experienceArray}) => {
    const dispatch= useDispatch();

    const handleDelete=(id)=>{
        dispatch(delete_experience(id));

    }

    const experience= experienceArray.map(exp =>(
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td className="hide-sm"><Moment format="YYYY/MM/DD">{exp.from}</Moment> - { exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment>: "Ongoing"}</td>
                
                <td><button className="btn btn-danger" onClick= {()=>handleDelete(exp._id)}>Delete</button></td>

            </tr>
    ))
    return (
        <>
            <h4 className="my-2 mt-3 mb-2">Experience Credentials</h4>
            <table className="table" style={{fontSize:"1.4rem"}}>
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>   
            </table>
        </>
    )
}

export default Experience ;
