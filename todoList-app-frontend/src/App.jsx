import './App.css';
import MainApp from './MainApp';
import Login from './Login'; 
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import WelcomePage from './WelcomePage';


function App() {
  return (
    <Routes>
      <Route path="/" exact element={<MainApp />} />  
      <Route path="/welcome" exact element={<WelcomePage />} />   
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        
    </Routes>
  );
}
export default App;
