import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem';

// This is a functional component for the Todo List
function TodoList() {
  // State for the tasks
  const [tasks, setTasks] = useState([]);

  // UseEffect hook to get tasks from local storage when the component mounts
  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);
  
  // State for the text of the new task
  const [text, setText] = useState('');

  // Function to add a new task
  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    // Update the tasks state and local storage
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    // Clear the text state
    setText('');
  }

  // Function to delete a task
  function deleteTask(id) {
    // Filter out the task with the given id
    const remainingTasks = tasks.filter(task => task.id !== id);
    // Update the tasks state and local storage
    setTasks(remainingTasks);
    localStorage.setItem('tasks', JSON.stringify(remainingTasks));
  }

  // Function to toggle the completed status of a task
  function toggleCompleted(id) {
    // Map through the tasks and update the completed status of the task with the given id
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      } else {
        return task;
      }
    });
    // Update the tasks state and local storage
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Function to edit a task
  function editTask(id, val) {
    // Map through the tasks and update the text of the task with the given id
    const editedTask = tasks.map(task => {
      if (task.id === id) {
        return {...task, text: val};
      } else {
        return task;
      }
    });
    // Update the tasks state and local storage
    setTasks(editedTask);
    localStorage.setItem('tasks', JSON.stringify(editedTask));
  }

  // Render the Todo List
  return (
    <div className="todo-list">
      <h1 className="header-todo">TODO LIST</h1>
      <div className='wrapper-add-task'>
        <button 
          onClick={() => addTask(text)}
          className='button-add-task'
        >
          Add Task
        </button>
        <form
          onSubmit={e => {
            e.preventDefault();
            addTask(text);
          }}
          className='form-add-task'
        >
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className='input-add-task'
          />
        </form>
      </div>
      <div className='wrapper-todo-item'>
        {/* Map through the tasks and render a TodoItem for each one */}
        {tasks.map(task => (
          <TodoItem
            key={task.id} 
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted} 
            editTask={editTask}
          />
        ))}
      </div>
    </div>
    );
}

export default TodoList;