
import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Model from './components/Model';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';

function App() {

  const[isClose, setIsClose] = useState(true); 
  const [tasksData,setTasksData] = useState([]);
  
  useEffect (()=>{
    async function getTasks(){
      const response = await fetch('http://localhost:8080/tasks');
      const allTasks = await response.json();
      setTasksData(allTasks["all tasks"]);
    }
    getTasks();
  }
  ,[])
  function onOpen(){
    setIsClose(false);
  }
  function onClose(){
    setIsClose(true);
  }
  function getFormData(data){
      console.log(data);

      fetch('http://localhost:8080/add',{
        method:'POST',
        body: JSON.stringify({...data, 'order' : 1}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    setTasksData([...tasksData, data]);
  }
  return (
    <div className='app'>
    <MainHeader onOpen={onOpen}/>
    {!isClose  &&
    <Model>
      <NewTask onClose={onClose} formData={getFormData}></NewTask>
    </Model>
    }
    {/*TODO ***********************
    **********************
    **********************
    **********************
    get the output data from backend and check if empt of not to tell the user we
    still need to output the old values */}
    <Tasks onOpen={onOpen} tasksData={tasksData}/>
    </div>
  );
}

export default App
