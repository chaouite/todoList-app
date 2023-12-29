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
        //TODO send a delete
    }
    return (
        <div className={classes.task}>
            <div className={classes.description}>
                {/**TODO get title and text from backend */}
            <h2>Title</h2>
            <p>text</p>
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