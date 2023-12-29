import Task from "./Task";
function Tasks(props){

    return (
        <>
        {
            props.tasksData.map((task,index)=>
                (<Task onOpen={props.onOpen} taskData={task} key={index}/>)
             )
        }
        </>
    );
}
export default Tasks;