import { useState } from 'react';
import classes from './Task.module.css'
import { SlCheck } from "react-icons/sl";
import { VscTrash } from "react-icons/vsc";
function Task (props){
    const [isCompleted,setIsCompleted]= useState(false);
    function onComplete(){
        setIsCompleted(!isCompleted);
    }

    function onDelete(){
        //TODO send a delete -- Try with the index key

    }
    return (
        <div className={classes.task}>
            <div className={classes.description}>
                {/**TODO get title and text from backend */}
            <h2>{props.taskData.title}</h2>
            <p>{props.taskData.text}</p>
            <p style={{'fontStyle': 'italic','color':'#6483bb'}}>Category: {props.taskData.category}</p>
            </div>
            <div className={classes.actions}>
                <div>
                    <button type='button' className={classes.updateButton} onClick={props.onOpen}>update</button>
                </div>
                <div>
                    {isCompleted && <button className={classes.iconButton}  onClick={onComplete}><SlCheck style={{'color': 'green' }} size={24} /></button>}
                    {!isCompleted && <button className={classes.iconButton}  onClick={onComplete}><SlCheck style={{'color': 'grey' }} size={24} /></button>}
                </div>
                <div>
                    <VscTrash className={classes.deleteIcon} size={24} onClick={onDelete} />
                </div>
            </div>
            
        </div>
    );
}
export default Task;