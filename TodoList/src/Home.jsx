import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import './App.css'; // Import the App.css file

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get")
      .then(result => {
        console.log("Fetched todos:", result.data);
        setTodos(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleCheck = (id) => {
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="create-parent">
      <div className="todo-list">
        <h2>To-do List</h2>
        <Create setTodos={setTodos} />
        {todos.length === 0 ? (
          <div>
            <h2>No Tasks for Today</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                checked={todo.completed || false}
                onChange={() => handleCheck(todo._id)} 
              />
              <span>{todo.task}</span>
              <button onClick={() => handleRemove(todo._id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
