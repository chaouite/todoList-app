import classes from './MainHeader.module.css'
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

function MainHeader (props){

    const navigate = useNavigate();
    //TODO add logout option
    function onLogout(){
        navigate("/login")
    }
    function onAdd(){
        props.onAdd();
        props.onOpen();
    }
    return (
        <header className={classes.main}>
            <div  className={classes.auth}>
                <p>Hello Leith!</p>
                <SlLogout  className={classes.authIcon} onClick={onLogout} />
            </div>
            <div className={classes.mainHead}> 
            <h1>Todo List</h1>
           <button className={classes.button} onClick={onAdd}>add new task</button>      
            </div>
           
        </header>
    );
}
export default MainHeader;