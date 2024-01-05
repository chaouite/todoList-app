/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MainHeader from './components/MainHeader';
import Model from './components/Model';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';
import CategoryFilter from './components/CategoryFilter';
import classes from './MainApp.module.css';


function MainApp() {

  const[isClose, setIsClose] = useState(true); 
  const [tasksData,setTasksData] = useState([]);
  const [showAllCategories,setShowAllCategories] = useState(false);
  
  const [formData, setFormData] = useState({
    'title':'',
    'text': '',
    'category': ''
  });


  const [username,setUsername] = useState('');
  const [isUpdating,setIsUpdating] = useState(false);

  // To show the username - TODO : when refresh the page keep the connection
  useEffect(()=>{
    async function getLoggedInUser(){
      const response = await fetch('http://localhost:8080/validate',{
        headers: {
                  'Content-Type': 'application/json'
        },
        credentials : 'include'
    })
      const data = await response.json();
      console.log("validating...",data["user"]);
      setUsername(data["user"].username)
    }
    getLoggedInUser()
  },[])

  // First reload of the page
  useEffect (()=>{
    async function getTasks(){
    if(username && username !== ''){ // to eliminate the HTTP request if username is not set yet
      // Get all tasks
        const response = await fetch(`http://localhost:8080/tasks/${username}`);
        const allTasks = await response.json();
        setTasksData(allTasks["all tasks"]);
    }
    }
    getTasks();
  }
  ,[username])

  useEffect(()=>{
    
  },[])

  function onOpen(){
    setIsClose(false);
  }
  function onClose(){
    setIsClose(true);
  }


  // Add a new Task
  async function addTaskHandler(taskToBeAdded){
    
    fetch('http://localhost:8080/add',{
        method:'POST',
        body: JSON.stringify({...taskToBeAdded}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    setTasksData((prevTasksData) => [...prevTasksData, taskToBeAdded]); 
  }

  // Delete a task based on its id
  async function onDelete(taskToBeDeleted){

    const response = await fetch(`http://localhost:8080/tasks/${username}`);
    const allTasks = await response.json();
    const task = allTasks["all tasks"].find((task)=>
     task.title === taskToBeDeleted.title
     && task.text === taskToBeDeleted.text
     && task.category === taskToBeDeleted.category)
    
    // Delete 
    const res = await fetch(`http://localhost:8080/delete/${task.id}`,
        {
            method:'DELETE',
            headers:  {
                'Content-Type': 'application/json',
              }
        });
    // Get the tasks with the new order
    const newTasks = await res.json();

    /** If I was in a rendering of another category and I deleted fron there
     * I want the filter radios to be checked to all instead of that specific category
     */
    setShowAllCategories(true);
    // Update the state of tasks
    const newArray = newTasks["new tasks"].filter((myTask) => myTask.id !== task.id);
    setTasksData(newArray);
    // And get the new order
    // Change older data order
 
  }

  // Mark a task as completed
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
    if((category.toLowerCase() === "work" || category.toLowerCase() === "studies"||category.toLowerCase() === "personal")
    ){
      const response = await fetch(`http://localhost:8080/findall/${category}/${username}`);
      const tasksOfCategory = await response.json();
      setTasksData(tasksOfCategory["category tasks"])
    }
    else{
      const response = await fetch(`http://localhost:8080/tasks/${username}`);
      const allTasks = await response.json();
      setTasksData(allTasks["all tasks"]);
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

  function showAll(value){
    setShowAllCategories(value)
  }

  return (
        <div className={classes.app}>
          <MainHeader onOpen={onOpen} onAdd={onAdd} username={username}/>
          {!isClose  &&
          <Model>
            <NewTask onClose={onClose}
            addTaskHandler={addTaskHandler}
            username ={username}
            updateTaskHandler={updateTaskHandler}
            formData={formData}
            isUpdating={isUpdating}></NewTask>
          </Model>
          }
          <CategoryFilter categoryHandler={categoryHandler} showAll={showAll}
          showAllCategories={showAllCategories}/>
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

export default MainApp;
