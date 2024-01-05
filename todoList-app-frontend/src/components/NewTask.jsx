/* eslint-disable react/prop-types */
import { useEffect,useRef, useState } from 'react';
import classes from './NewTask.module.css';

function NewTask(props) {
  const [newTaskInput, setNewTaskInput] = useState({
    title: '',
    text: '',
    category: ''
  });

  const titleRef = useRef();
  const textRef = useRef();
  const categoryRef = useRef();

    const [nextOrder,setNextOrder] =useState(0);

  // Update the form fields when props.formData changes
  useEffect(() => {
    setNewTaskInput({
      title: props.formData.title || '',
      text: props.formData.text || '',
      category: props.formData.category || ''
    });
  }, [props.formData]);

  useEffect(()=>{
    async function getNextOrder(){
      const response = await fetch(`http://localhost:8080/nextorder/${props.username}`);
      const data = await response.json();
      setNextOrder(data["next order"]);
    }
    getNextOrder();
  },[])

  function formHandler(event) {
    event.preventDefault();
    // If I am adding a new task
    if(!props.isUpdating){
      console.log("adding...");
      props.addTaskHandler({
        title: titleRef.current.value,
        text: textRef.current.value,
        category: categoryRef.current.value,
        taskOrder: nextOrder,
        creator: props.username
      });
    }
    // If I am updating an old task
    else{
      console.log("updating...");
      props.updateTaskHandler({
        title: titleRef.current.value,
        text: textRef.current.value,
        category: categoryRef.current.value
      },props.formData);
    }
    
    props.onClose();
  }

  return (
    <div className={classes.myForm}>
      <form onSubmit={formHandler}>
        <p>
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            ref={titleRef}
            value={newTaskInput.title}
            onChange={(e) => setNewTaskInput({title: e.target.value })}
          />
        </p>
        <p>
          <label>Text</label>
          <textarea
            type="text"
            name="title"
            required
            ref={textRef}
            value={newTaskInput.text}
            onChange={(e) => setNewTaskInput({  text: e.target.value })}
          ></textarea>
        </p>
        <p>
          <label>Category </label>
          <select name="option" ref={categoryRef} value={newTaskInput.category} onChange={(e) => setNewTaskInput({  category: e.target.value })}>
            <option value="work">Work</option>
            <option value="studies">Studies</option>
            <option value="personal">Personal</option>
          </select>
        </p>
        <button type="button" onClick={props.onClose}>
          cancel
        </button>
        <button type="submit">save</button>     
      </form>
    </div>
  );
}

export default NewTask;