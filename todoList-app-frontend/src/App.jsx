
import { useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Model from './components/Model';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';

function App() {

  const[isClose, setIsClose] = useState(true); 
  function onOpen(){
    setIsClose(false);
  }
  function onClose(){
    setIsClose(true);
  }
  return (
    <div className='app'>
    <MainHeader onOpen={onOpen}/>
    {!isClose  &&
    <Model>
      <NewTask onClose={onClose}></NewTask>
    </Model>
    }
    {/*TODO still need to output the old values */}
    <Tasks onOpen={onOpen}/>
    </div>
  );
}

export default App
