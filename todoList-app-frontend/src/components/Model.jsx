import NewTask from "./NewTask";
import classes from './Model.module.css'
function Model (props){

    return(
        <div className={classes.overlay}>
            {props.children}
        </div>
    );
}
export default Model;