import classes from './MainHeader.module.css'
import NewTask from './NewTask';
function MainHeader (){

    return (
        <header className={classes.main}>
           <h1>Todo List</h1>
           <NewTask></NewTask>
           
        </header>
    );
}
export default MainHeader;