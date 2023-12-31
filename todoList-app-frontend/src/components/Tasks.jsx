import { useState,useEffect } from "react";
import Task from "./Task";
function Tasks(props){

    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        setTasks(props.tasksData);
      }, [props.tasksData]);

    // function deleteTask(taskToBeDeleted){
    //     console.log(taskToBeDeleted);
    //     console.log(tasks);
    //     fetch(`http://localhost:8080/delete/${idTaskToBeDeleted}`,
    //     {
    //         method:'DELETE',
    //         headers:  {
    //             'Content-Type': 'application/json',
    //           }
    //     }) .then(() => {
    //     const newArray = tasks.filter((task) => task.id !== idTaskToBeDeleted);
    //     setTasks(newArray);})
    // }

    return (
        <>
        {
            tasks.map((task,index)=>
                (<Task onOpen={props.onOpen} taskData={task} key={index} onDelete={props.deleteTask}/>)
             )
        }
        </>
    );
}
export default Tasks;