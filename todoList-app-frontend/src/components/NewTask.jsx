import React, { useRef, useState } from 'react';
import classes from  './NewTask.module.css';
function NewTask(props){

    const [newTaskInput, setNewTaskInput] = useState({
        'title':'',
        'text': '',
        'category': ''
    });
  
    const titleRef = useRef('');
    const textRef = useRef('');
    const categoryRef = useRef('');
    function formHandler(event){
        event.preventDefault();

        // console.log(titleRef.current.value);
        // console.log(textRef.current.value);
        // console.log(categoryRef.current.value);
        
        props.formData({
            title: titleRef.current.value,
            text: textRef.current.value,
            category: categoryRef.current.value
          });
        //TODO send the request first
       
    
        props.onClose();
    }

    return (
        <div className={classes.myForm}>
        <form onSubmit={formHandler}>
            <p>
            <label>Title</label> 
                <input type='text' name='title' required ref={titleRef}></input>   
            </p>
            <p>
            <label>Text</label>
                <textarea type='text' name='title' required ref={textRef}></textarea>
            </p>
            <p>
            <label>Category </label>
               <select name="option"  ref={categoryRef}>
                    <option value="work">Work</option>
                    <option value="studies">Studies</option>
                    <option value="personal">Personal</option>
                </select>
            </p>
        <button type="submit">save</button>
        <button type="button" onClick={props.onClose}>cancel</button>
        </form>
        </div>
    )
}
export default NewTask;