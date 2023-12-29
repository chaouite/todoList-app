import React, { useState } from 'react';
import classes from  './NewTask.module.css';
function NewTask(props){
  
    function formHandler(event){
        event.preventDefault();
        //TODO send the request first
        props.onClose();
    }
    return (
        <div className={classes.myForm}>
        <form onSubmit={formHandler}>
            <p>
            <label>Title</label> 
                <input type='text' name='title'></input>   
            </p>
            <p>
            <label>Text</label>
                <textarea type='text' name='title'></textarea>
            </p>
            <p>
            <label>Category </label>
               <select name="option"  >
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