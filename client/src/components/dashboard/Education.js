import React from 'react'
import Moment from 'react-moment';  
import {useDispatch } from 'react-redux';   
import { delete_education } from '../../redux/ducks/profile';

const Education = ({educationArray}) => {
    const dispatch= useDispatch();

    const handleDelete=(id)=>{
        dispatch(delete_education(id));

    }

    const education= educationArray.map(edu =>(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td className="hide-sm"><Moment format="YYYY/MM/DD">{edu.from}</Moment> - { edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment>: "Ongoing"}</td>
                
                <td><button className="btn btn-danger" onClick= {()=>handleDelete(edu._id)}>Delete</button></td>

            </tr>
    ))
    return (
        <>
            <h4 className="my-2 mt-3 mb-2">Education Credentials</h4>
            <table className="table" style={{fontSize:"1.4rem"}}>
                    <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>   
            </table>
        </>
    )
}

export default Education ;
