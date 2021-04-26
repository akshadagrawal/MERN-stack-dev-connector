import classnames from 'classnames';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { add_education } from '../../redux/ducks/profile';

const AddEducation = () => {

    const history= useHistory();
    const dispatch= useDispatch();
    const [education,setEducation]= useState({
        degree:'',
        school:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current: false,
        description:'',
        disabled: false
    });

    const errors= useSelector(state=> state.errors);

    const handleChange=(e)=>{
        setEducation({
            ...education,
            [e.target.name]: e.target.value 
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch (add_education(education,history));           
     };


    return (
        <>
            <section className="container">
                <h1 className="large text-primary">
                Add Education
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add education details/qualifications
                    
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="* Degree or Certification" 
                            name="degree" 
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.degree})}
                            value={education.degree}
                            onChange= {handleChange}
                         />
                         {errors.degree && (<div className= "invalid-feedback">{errors.degree}</div>)}

                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* School" 
                            name="school"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.school})}
                            value={education.school}
                            onChange= {handleChange} 
                        
                            />
                        {errors.school && (<div className= "invalid-feedback">{errors.school}</div>)}

                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Field of Study" 
                            name="fieldofstudy"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.fieldofstudy})}
                            value={education.fieldofstudy}
                            onChange= {handleChange}  
                        />                        
                        {errors.fieldofstudy && (<div className= "invalid-feedback">{errors.fieldofstudy}</div>)}

                    </div>
                    <div className="form-group">
                    <h4>* From Date</h4>
                        <input 
                            type="date" 
                            name="from" 
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.from})}
                            value={education.from}
                            onChange= {handleChange}  

                        />
                         {errors.from && (<div className= "invalid-feedback">{errors.from}</div>)}

                    </div>
                    <div className="form-group">
                        <p><input 
                            type="checkbox" 
                            name="current" 
                            value={education.current} 
                            checked={education.current}
                            onChange={(e)=>{
                                setEducation({
                                    ...education,
                                    disabled : !education.disabled,
                                    current : !education.current
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
                             value={education.to}
                             onChange= {handleChange}  
                             disabled= {education.disabled ? "disabled" : ""}
                         />
                          {errors.to && (<div className= "invalid-feedback">{errors.to}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Tell us about the program"
                            className={classnames("form-control form-control-lg", {"is-invalid":errors.description})}
                            value={education.description}
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

export default AddEducation
