import './App.css';
import MainApp from './MainApp';
import Login from './Login'; 
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
       <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainApp />} />    
    </Routes>
  );
}
export default App;
