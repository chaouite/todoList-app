import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './components/NewTask.module.css'
function Login(){

    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({
        username: '',
        password: ''
    })
   
//********************LOGIN********************* */
    const loginUsernameRef = useRef('');
    const loginPasswordRef = useRef('');
    function loginHandler(event){
        event.preventDefault();
        fetch('http://localhost:8080/login',{
            method:'POST',
            body: JSON.stringify(loginData),
            credentials:'include', //To get the cookie in browser but it can be deleted since in backend CROS is allowed
            headers: {
              'Content-Type': 'application/json'
            }}).then(response => {
                if(!response.ok && !response.status === 409){
                        throw new Error('Something went wrong');
                }
                return response.json();
            }).then(data => {
                if (data && data.error) { // Invalid username or password
                    console.log(data.error);
                    alert(data.error);
                  } else{
                console.log(data["token"])
                navigate('/')
                }
            })
    }

    function loginUsernameHandler(){
        setLoginData((prevLoginData)=> ( {...prevLoginData, username: loginUsernameRef.current.value}));
    }
    function loginPasswordHandler(){
        setLoginData((prevLoginData)=>({...prevLoginData, password: loginPasswordRef.current.value}))
    }

    function onBack(){
        navigate("/welcome")
    }
    
    return (
        <>
            <h1>ToDo List</h1>
            <h2>Thanks for registring, please login now</h2>
            <div>
                <p>
                    Login Form
                </p>
                <form onSubmit={loginHandler} className={classes.myForm}>
                    <p>
                        <label>Username</label>
                        <input 
                            required 
                            name='username'  
                            type="text"
                            onChange={loginUsernameHandler}
                            ref={loginUsernameRef} />
                    </p>
                    <p>
                        <label>Password</label>
                        <input 
                            required 
                            name='password'  
                            type="password" 
                            onChange={loginPasswordHandler}
                            ref={loginPasswordRef} />
                    </p>
                    <button type='button' onClick={onBack}>back</button>
                    <button>login</button>
                </form>
            </div>
            
        </>
    );
}
export default Login;
// import { useEffect, useRef, useState } from 'react';
// import classes from './components/NewTask.module.css'
// function Login(){

//     const [loginData,setLoginData] = useState({
//         username: '',
//         password: ''
//     })
//     const [signupData,setSignupData] = useState({
//         username: '',
//         password: ''
//     })
//     const [showLogin, setShowLogin] = useState(false)
//     const [showSignup, setShowSignup] = useState(false)
//     useEffect(()=>{
//         console.log(loginData);
//         console.log(signupData);
//     },[loginData,signupData])

   
// //********************LOGIN********************* */
//     const loginUsernameRef = useRef('');
//     const loginPasswordRef = useRef('');
//     function loginHandler(event){
//         event.preventDefault();
//     }

//     function loginUsernameHandler(){
//         setLoginData((prevLoginData)=> ( {...prevLoginData, username: loginUsernameRef.current.value}));
//     }
//     function loginPasswordHandler(){
//         setLoginData((prevLoginData)=>({...prevLoginData, password: loginPasswordRef.current.value}))
//     }
//     function onLogin(){
//         setShowSignup(false)
//         setShowLogin(!showLogin);
//     }
// //********************SIGNUP********************* */
//     const signupUsernameRef = useRef('');
//     const signupPasswordRef = useRef('');
//      function signupHandler(event){
//         event.preventDefault();
//             fetch('http://localhost:8080/signup',{
//                 method:'POST',
//                 body: JSON.stringify(signupData),
//                 headers: {
//                   'Content-Type': 'application/json'
//                 }
//             }).then(response => (response.json()))
//             .then(data => console.log(data["created user"])) // the created user - JSON response
//             .catch(error => {
//                 console.log(error.message)
//                 // Display the error to the user
//                 alert(error.message);
//             }); 
//     }
//     function signupUsernameHandler(){
//         setSignupData((prevSignupData)=> ( {...prevSignupData, username: signupUsernameRef.current.value}));
//     }
//     function signupPasswordHandler(){
//         setSignupData((prevSignupData)=>({...prevSignupData, password: signupPasswordRef.current.value}))
//     }
//     function onSignup(){
//         setShowLogin(false)
//         setShowSignup(!showSignup);
//     }

     
    
//     return (
//         <>
//             <h1>ToDo List</h1>
//             <div className={classes.myForm}>
//                 <button onClick={onSignup}>sign up</button>
//                 <button onClick={onLogin}>login</button>
//             </div>
//             {showLogin &&
//             <div>
//                 <p>
//                     Login Form
//                 </p>
//                 <form onSubmit={loginHandler} className={classes.myForm}>
//                     <p>
//                         <label>Username</label>
//                         <input 
//                             required 
//                             name='username'  
//                             type="text"
//                             onChange={loginUsernameHandler}
//                             ref={loginUsernameRef} />
//                     </p>
//                     <p>
//                         <label>Password</label>
//                         <input 
//                             required 
//                             name='password'  
//                             type="password" 
//                             onChange={loginPasswordHandler}
//                             ref={loginPasswordRef} />
//                     </p>
//                     <button>login</button>
//                 </form>
//             </div>}
//             {showSignup &&
//             <div>
//                 <p>
//                     Sign Up Form
//                 </p>
//                 <form onSubmit={signupHandler} className={classes.myForm}>
//                     <p>
//                         <label>Username</label>
//                         <input 
//                             required 
//                             name='username'  
//                             type="text"
//                             onChange={signupUsernameHandler}
//                             ref={signupUsernameRef} />
//                     </p>
//                     <p>
//                         <label>Password</label>
//                         <input 
//                             required 
//                             name='password'  
//                             type="text" 
//                             onChange={signupPasswordHandler}
//                             ref={signupPasswordRef} />
//                     </p>
//                     <button>sign up</button>
//                 </form>
//             </div>}
//         </>
//     );
// }
// export default Login;