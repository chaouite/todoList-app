
import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Model from './components/Model';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';

function App() {

  const[isClose, setIsClose] = useState(true); 
  const [tasksData,setTasksData] = useState([]);


  function onOpen(){
    setIsClose(false);
  }
  function onClose(){
    setIsClose(true);
  }

  // First reload of the page
  useEffect (()=>{
    async function getTasks(){
      const response = await fetch('http://localhost:8080/tasks');
      const allTasks = await response.json();
      setTasksData(allTasks["all tasks"]);
    }
    getTasks();
  }
  ,[])

  // Add a new Task
  function addTaskData(data){
      fetch('http://localhost:8080/add',{
        method:'POST',
        body: JSON.stringify({...data, 'order' : 1}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    setTasksData((prevTasksData) => [...prevTasksData, data]); 
  }

  // Delete a task based on its id
  async function onDelete(taskToBeDeleted){

    /**First we need to get the id from the backend because it is generated there
     * 1- get the tasks table from backend
     * 2- get the appropriate task 
     * 3- get its id
     * I didn't use "find id Req" because I need the whole array of tasks to update the state of tasks
     */
    const response = await fetch('http://localhost:8080/tasks');
    const allTasks = await response.json();
    const task = allTasks["all tasks"].find((task)=>
     task.title === taskToBeDeleted.title
     && task.text === taskToBeDeleted.text
     && task.category === taskToBeDeleted.category)
    
    // Delete 
     fetch(`http://localhost:8080/delete/${task.id}`,
        {
            method:'DELETE',
            headers:  {
                'Content-Type': 'application/json',
              }
        })
    
    // Update the state of tasks
    const newArray = allTasks["all tasks"].filter((myTask) => myTask.id !== task.id);
    setTasksData(newArray);
 
  }
   async function onComplete(taskTobeCompleted){
    // Find id of the task to be conpleted
    const response = await fetch(`http://localhost:8080/find/${taskTobeCompleted.title}/${taskTobeCompleted.text}/${taskTobeCompleted.category}`);
    const idTask = await response.json();

    // Send the request to complete/uncomplete a task
    fetch(`http://localhost:8080/complete/${idTask.id}`,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }})
  }

  return (
    <div className='app'>
    <MainHeader onOpen={onOpen}/>
    {!isClose  &&
    <Model>
      <NewTask onClose={onClose} formData={addTaskData}></NewTask>
    </Model>
    }
    <Tasks onOpen={onOpen} tasksData={tasksData}  
    deleteTask={onDelete} onComplete={onComplete}
    />
    </div>
  );
}

export default App;
