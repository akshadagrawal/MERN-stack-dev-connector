import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { add_comment } from '../../redux/ducks/posts';
import classnames from 'classnames';

const CommentForm = ({postId}) => {
    const [text,setText]= useState('');
    const errors= useSelector(state=> state.errors);
    const user= useSelector(state=> state.auth.user);

    const dispatch= useDispatch();

    const handleChange=(e)=>{
        setText(e.target.value);
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newComment= {
            text,
            name: user.name,
            avatar: user.avatar
        }
        dispatch(add_comment(newComment, postId));
        setText('');
           
     };

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Add Comment...</h3>
            </div>
            <form className="form my-1" onSubmit= {handleSubmit}>
            <textarea
                name="text"
                className={classnames("form-control form-control-lg", {"is-invalid":errors.text} )}
                cols="30"
                rows="4"
                placeholder="Comment here..."
                value= {text}
                onChange= {handleChange}
               
            ></textarea>
            {errors.text && (<div className= "invalid-feedback">{errors.text}</div>)}
            <small className="form-text">Tell us a little about yourself</small>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
      </div>
    )
}

export default CommentForm;                         



