/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import classes from './Task.module.css'
import { SlCheck } from "react-icons/sl";
import { VscTrash } from "react-icons/vsc";
function Task (props){
   const [isCompleted,setIsCompleted]= useState(false);

   // Checks if the task is done or not in the first render and also after a refresh
   useEffect(()=>{
    async function findId(){
        const response = await fetch(`http://localhost:8080/find/${props.taskData.title}/${props.taskData.text}/${props.taskData.category}`);
        const idTask = await response.json();
        const res = await fetch(`http://localhost:8080/${idTask.id}`);
        const task = await res.json();
        setIsCompleted(task.task.done);
    }
    findId();
   },[])
    function onComplete(){
        props.onComplete(props.taskData);
        setIsCompleted(!isCompleted);
    }

    function onDelete(){
        props.onDelete(props.taskData);
    }

    function onUpdate(){
        props.onUpdate(props.taskData);
        props.onOpen();
    }
    return (
        <div className={classes.task}>
            <div className={classes.description}>
                {/**TODO get title and text from backend */}
            <h2>{props.taskData.title}</h2>
            <p>{props.taskData.text}</p>
            <p style={{'fontStyle': 'italic','color':'#6483bb'}}>Category: {props.taskData.category}</p>
            <p style={{'fontStyle': 'italic','color':'#6483bb'}}>order: {props.taskData.taskOrder}</p>
            </div>
            <div className={classes.actions}>
                <div>
                    <button type='button' className={classes.updateButton} onClick={onUpdate}>update</button>
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