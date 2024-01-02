
import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Model from './components/Model';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';
import CategoryFilter from './components/CategoryFilter';


function App() {

  const[isClose, setIsClose] = useState(true); 
  const [tasksData,setTasksData] = useState([]);
  const [formData, setFormData] = useState({
    'title':'',
    'text': '',
    'category': ''
  });
  const [isUpdating,setIsUpdating] = useState(false);


  function onOpen(){
    setIsClose(false);
  }
  function onClose(){
    setIsClose(true);
  }

  // Get all tasks
  async function getTasks(){
    const response = await fetch('http://localhost:8080/tasks');
    const allTasks = await response.json();
    setTasksData(allTasks["all tasks"]);
  }

  // First reload of the page
  useEffect (()=>{
    getTasks();
  }
  ,[])

  // Add a new Task
  function addTaskHandler(taskToBeAdded){
      fetch('http://localhost:8080/add',{
        method:'POST',
        body: JSON.stringify({...taskToBeAdded, 'order' : 1}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    setTasksData((prevTasksData) => [...prevTasksData, taskToBeAdded]); 
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
    // Find id of the task to be completed
    const response = await fetch(`http://localhost:8080/find/${taskTobeCompleted.title}/${taskTobeCompleted.text}/${taskTobeCompleted.category}`);
    const idTask = await response.json();

    // Send the request to complete/uncomplete a task
    fetch(`http://localhost:8080/complete/${idTask.id}`,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  // Get all tasks of a category 
  async function categoryHandler(category){
    if(category.toLowerCase() === "work" || category.toLowerCase() === "studies"||category.toLowerCase() === "personal"){
      const response = await fetch(`http://localhost:8080/findall/${category}`);
      const tasksOfCategory = await response.json();
      setTasksData(tasksOfCategory["category tasks"])
    }
    else{
      getTasks();
    }
  }

  function onUpdate(taskToBeUpdated){
    setFormData(taskToBeUpdated);
    setIsUpdating(true);
  
  }

  // Update a task
  async function updateTaskHandler(newTaskData,taskToBeUpdated){
    //Find id of the task to be updated
    const response = await fetch(`http://localhost:8080/find/${taskToBeUpdated.title}/${taskToBeUpdated.text}/${taskToBeUpdated.category}`);
    const idTask = await response.json();

    // Update
    fetch(`http://localhost:8080/update/${idTask.id}`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTaskData)
    })

    // Trigger the re-render and update the state localy
    const newArary = tasksData.map((task)=>{
      if (task.title === taskToBeUpdated.title && task.text === taskToBeUpdated.text && task.category === taskToBeUpdated.category) {
        return {
          ...task,
          ...newTaskData
        };
      }
      return task;
    }
    )
    setTasksData(newArary);

 }

  function onAdd(){
    setIsUpdating(false);
    setFormData({
      'title':'',
      'text': '',
      'category': ''
    })
  }

  return (
    <div className='app'>
    <MainHeader onOpen={onOpen} onAdd={onAdd}/>
    {!isClose  &&
    <Model>
      <NewTask onClose={onClose}
       addTaskHandler={addTaskHandler}
       updateTaskHandler={updateTaskHandler}
       formData={formData}
       isUpdating={isUpdating}></NewTask>
    </Model>
    }
    <CategoryFilter categoryHandler={categoryHandler}/>
    {tasksData.length === 0 && <p
    style={{'color': '#0b49ba',
      'backgroundColor': 'black',
      'padding': '10px',
      'borderRadius': '10px'}}
    >No tasks for now!</p>}
    <Tasks onOpen={onOpen} tasksData={tasksData}  
    deleteTask={onDelete} onComplete={onComplete}
    onUpdate={onUpdate}
    />
    </div>
  );
}

export default App;
