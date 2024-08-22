import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ setTodos }) => {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.trim()) {
            axios.post('http://localhost:5000/add', { task })
                .then(result => {
                    console.log(result);
                    setTodos(prevTodos => [...prevTodos, result.data]);
                    setTask('');
                })
                .catch(err => console.log(err));
        } else {
            console.log("Task cannot be empty");
        }
    };

    return (
        <div className="create-container">
            <input 
                type="text" 
                placeholder="Enter a Task" 
                value={task}
                onChange={(e) => setTask(e.target.value)} 
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
};

export default Create;
