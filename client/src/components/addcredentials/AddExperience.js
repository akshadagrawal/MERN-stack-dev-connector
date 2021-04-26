import classnames from 'classnames';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { add_experience } from '../../redux/ducks/profile';

const AddExperience = () => {

    const history= useHistory();
    const dispatch= useDispatch();
    const [experience,setExperience]= useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current: false,
        description:'',
        disabled: false
    });

    const errors= useSelector(state=> state.errors);

    const handleChange=(e)=>{
        setExperience({
            ...experience,
            [e.target.name]: e.target.value 
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch (add_experience(experience,history));           
     };


    return (
        <>
            <section className="container">
                <h1 className="large text-primary">
                Add An Experience
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any developer/programming
                    positions that you have had in the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="* Job Title" 
                            name="title" 
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.title})}
                            value={experience.title}
                            onChange= {handleChange}
                         />
                         {errors.title && (<div className= "invalid-feedback">{errors.title}</div>)}

                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Company" 
                            name="company"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.company})}
                            value={experience.company}
                            onChange= {handleChange} 
                        
                            />
                        {errors.company && (<div className= "invalid-feedback">{errors.company}</div>)}

                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Location" 
                            name="location"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.location})}
                            value={experience.location}
                            onChange= {handleChange}  
                        />                        
                        {errors.location && (<div className= "invalid-feedback">{errors.location}</div>)}

                    </div>
                    <div className="form-group">
                    <h4>* From Date</h4>
                        <input 
                            type="date" 
                            name="from" 
                                                       className={classnames("form-control form-control-lg", {"is-invalid":errors.from})}
                            value={experience.from}
                            onChange= {handleChange}  

                        />
                         {errors.from && (<div className= "invalid-feedback">{errors.from}</div>)}

                    </div>
                    <div className="form-group">
                        <p><input 
                            type="checkbox" 
                            name="current" 
                            value={experience.current} 
                            checked={experience.current}
                            onChange={(e)=>{
                                setExperience({
                                    ...experience,
                                    disabled : !experience.disabled,
                                    current : !experience.current
                                })
                            }}
                        /> Current Job</p>
                    </div>
                    <div className="form-group">
                    <h4>To Date</h4>
                        <input 
                            type="date"
                             name="to"
                             className={classnames("form-control form-control-lg", {"is-invalid":errors.to})}
                             value={experience.to}
                             onChange= {handleChange}  
                             disabled= {experience.disabled ? "disabled" : ""}
                         />
                          {errors.to && (<div className= "invalid-feedback">{errors.to}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.description})}
                            value={experience.description}
                            onChange= {handleChange}  
                        >
                         {errors.description && (<div className= "invalid-feedback">{errors.description}</div>)}
                        </textarea>
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary my-1" 
                    />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </section>
        </>
    )
}

export default AddExperience
