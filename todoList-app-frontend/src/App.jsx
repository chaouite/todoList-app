import './App.css';
import MainApp from './MainApp';
import Login from './Login'; 
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import WelcomePage from './WelcomePage';
import {useState } from 'react';


function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  // Prevent unauth user to go to '/'
  function loggedIn(){
    setIsLoggedIn(true)
  }
  return (
    <Routes>
      <Route path="/" exact element={isLoggedIn? <MainApp /> : <WelcomePage /> } />  
      <Route path="/welcome" exact element={<WelcomePage />} />   
      <Route path="/login" element={<Login  isLoggedIn={loggedIn}/>} />
      <Route path="/signup" element={<Signup />} />
        
    </Routes>
  );
}
export default App;
