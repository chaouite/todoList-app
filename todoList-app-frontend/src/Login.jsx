import { useEffect, useRef, useState } from 'react';
import classes from './components/NewTask.module.css'
function Login(){

    const [loginData,setLoginData] = useState({
        username: '',
        password: ''
    })
    useEffect(()=>{
        console.log(loginData);
    },[loginData])

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    function loginHandler(event){
        event.preventDefault();
    }
    function usernameHandler(){
        setLoginData((prevLoginData)=> ( {...prevLoginData, username: usernameRef.current.value}));
    }
    function passwordHandler(){
        setLoginData((prevLoginData)=>({...prevLoginData, password: passwordRef.current.value}))
    }
    return (
        <>
            <h1>ToDo List Login Page</h1>
            <div>
                <form onSubmit={loginHandler} className={classes.myForm}>
                    <p>
                        <label>Username</label>
                        <input 
                            required 
                            name='username'  
                            type="text"
                            onChange={usernameHandler}
                            ref={usernameRef} />
                    </p>
                    <p>
                        <label>Password</label>
                        <input 
                            required 
                            name='password'  
                            type="text" 
                            onChange={passwordHandler}
                            ref={passwordRef} />
                    </p>
                    <button>Login</button>
                </form>
            </div>
        </>
    );
}
export default Login;