import { useState,useEffect } from "react";
import Task from "./Task";
function Tasks(props){

    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        setTasks(props.tasksData);
      }, [props.tasksData]);

    return (
        <>
        {
            tasks.map((task,index)=>
                (<Task onOpen={props.onOpen} taskData={task} key={index} 
                    onDelete={props.deleteTask}
                    onComplete={props.onComplete}
                    onUpdate={props.onUpdate}/>)
             )
        }
        </>
    );
}
export default Tasks;