import Task from "./Task";
function Tasks(props){

    return (
        <Task onOpen={props.onOpen}/>
    );
}
export default Tasks;