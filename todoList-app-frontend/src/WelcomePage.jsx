import { useNavigate } from 'react-router-dom';
import classes from './components/NewTask.module.css'
function WelcomePage(){
    const navigate = useNavigate();

   
//********************LOGIN********************* */

    function onLogin(){
        navigate("/login")
    }
//********************SIGNUP********************* */

    function onSignup(){
        navigate("/signup")
    }  
    
    return (
        <>
            <h1>Welcome to </h1>
            <h1>ToDo List App</h1>
            <div className={classes.myForm}>
                <button onClick={onSignup}>sign up</button>
                <button onClick={onLogin}>login</button>
            </div>

        </>
    );
}
export default WelcomePage;