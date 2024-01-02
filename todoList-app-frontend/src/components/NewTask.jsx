import React, { useEffect,useRef, useState } from 'react';
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

  // Update the form fields when props.formData changes
  useEffect(() => {
    setNewTaskInput({
      title: props.formData.title || '',
      text: props.formData.text || '',
      category: props.formData.category || ''
    });
  }, [props.formData]);

  function formHandler(event) {
    event.preventDefault();
    // If I am adding a new task
    if(!props.isUpdating){
      console.log("adding...");
      props.addTaskHandler({
        title: titleRef.current.value,
        text: textRef.current.value,
        category: categoryRef.current.value
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
        <button type="submit">save</button>
        <button type="button" onClick={props.onClose}>
          cancel
        </button>
      </form>
    </div>
  );
}

export default NewTask;


// import React, { useRef, useState } from 'react';
// import classes from  './NewTask.module.css';
// function NewTask(props){

//     const [newTaskInput, setNewTaskInput] = useState({
//         'title':'',
//         'text': '',
//         'category': ''
//     });
  

//     const titleRef = useRef(props.formData.title);
//     const textRef = useRef(props.formData.text);
//     const categoryRef = useRef(props.formData.category);
//     function formHandler(event){
//         event.preventDefault();
//         props.addTaskHandler({
//             title: titleRef.current.value,
//             text: textRef.current.value,
//             category: categoryRef.current.value
//           });

//         props.onClose();
//     }

//     return (
//         <div className={classes.myForm}>
//         <form onSubmit={formHandler}>
//             <p>
//             <label>Title</label> 
//                 <input type='text' name='title' required ref={titleRef}></input>   
//             </p>
//             <p>
//             <label>Text</label>
//                 <textarea type='text' name='title' required ref={textRef}></textarea>
//             </p>
//             <p>
//             <label>Category </label>
//                <select name="option"  ref={categoryRef}>
//                     <option value="work">Work</option>
//                     <option value="studies">Studies</option>
//                     <option value="personal">Personal</option>
//                 </select>
//             </p>
//         <button type="submit">save</button>
//         <button type="button" onClick={props.onClose}>cancel</button>
//         </form>
//         </div>
//     )
// }
// export default NewTask;