import classes from './MainHeader.module.css'
import { SlLogout } from "react-icons/sl";

function MainHeader (props){
    //TODO add logout option
    function onLogout(){
        console.log("hi");
    }
    return (
        <header className={classes.main}>
            <div  className={classes.auth}>
                <p>Hello Leith!</p>
                <SlLogout  className={classes.authIcon} onClick={onLogout} />
            </div>
            <div className={classes.mainHead}> 
            <h1>Todo List</h1>
           <button className={classes.button} onClick={props.onOpen}>add new task</button>      
            </div>
           
        </header>
    );
}
export default MainHeader;