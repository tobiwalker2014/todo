import React, { useState } from 'react';
import { MdDelete,  MdEdit} from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

// This is a functional component for a single Todo item
function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  // State for whether the item is being edited
  const [isEditing, setEditing] = useState(false);
  // State for the text of the item
  const [text, setText] = useState('');

  // Function to handle the change of the checkbox
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <div className="todo-item">
      {/* Checkbox to mark the task as completed */}
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={handleChange}
        className='checkbox-todo-item'
      />
      {
        // If the item is being edited, show a form with an input field
        // Otherwise, just show the text of the task
        isEditing ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              setEditing(false);
              // When the form is submitted, call the editTask function
              editTask(task.id, text);
            }}
            className='form-edit-task'
          >
            <input 
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              className='input-edit-task'
            />
          </form>
        ) : 
          <p
            className={task.completed ? 'completed' : null}
          >
            {task.text}
          </p>
      }
      <div className='wrapper-buttons'>
        {/* Button to delete the task */}
        <button 
          onClick={() => deleteTask(task.id)}
          className='button-delete-task'
        >
          <MdDelete />
        </button>
        {/* Button to toggle the editing state */}
        <button 
          onClick={() => {
            setEditing(!isEditing);
            setText(task.text);
          }}
          className='button-edit-task'
        >
          {isEditing ? <IoMdCloseCircle /> : <MdEdit />}
        </button>
      </div>
    </div>
  );
}
export default TodoItem;