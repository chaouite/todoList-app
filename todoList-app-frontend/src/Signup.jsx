import {  useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './components/NewTask.module.css'
function Signup(){

    const navigate = useNavigate();
    const [signupData,setSignupData] = useState({
        username: '',
        password: ''
    })
  
//********************SIGNUP********************* */
    var signupUsernameRef = useRef('');
    var signupPasswordRef = useRef('');
     function signupHandler(event){
        event.preventDefault();
            fetch('http://localhost:8080/signup',{
                method:'POST',
                body: JSON.stringify(signupData),
                headers: {
                  'Content-Type': 'application/json'
                }
            }).then(response=> {
                if (!response.ok && !response.status === 409) {
                      throw new Error('Something went wrong');
                }
                return response.json(); 
            }).then(data => {
                if (data && data.error) {
                  console.log(data.error);
                  // Display the error to the user
                  alert(data.error);
                  setSignupData({
                    username: '',
                    password: ''
                  });

                } else {
                  console.log(data["created user"]);
                  navigate('/login')
                }
              });
    }
    function signupUsernameHandler(){
        setSignupData((prevSignupData)=> ( {...prevSignupData, username: signupUsernameRef.current.value}));
    }
    function signupPasswordHandler(){
        setSignupData((prevSignupData)=>({...prevSignupData, password: signupPasswordRef.current.value}))
    }

    function onBack(){
        navigate("/welcome")
    }
 
    return (
        <>
            <h1>ToDo List</h1>

            <div>
                <p>
                    Sign Up Form
                </p>
                <form onSubmit={signupHandler} className={classes.myForm}>
                    <p>
                        <label>Username</label>
                        <input 
                            required 
                            name='username'  
                            type="text"
                            onChange={signupUsernameHandler}
                            value={signupData.username}
                            ref={signupUsernameRef} />
                    </p>
                    <p>
                        <label>Password</label>
                        <input 
                            required 
                            name='password'  
                            type="text" 
                            onChange={signupPasswordHandler}
                           value={signupData.password}
                            ref={signupPasswordRef} />
                    </p>
                    <button type='button' onClick={onBack}>back</button>
                    <button>sign up</button>
                </form>
            </div>
        </>
    );
}
export default Signup;