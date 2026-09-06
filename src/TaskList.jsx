import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function TaskList({ tasks, addTask, deleteTask, toggleTask }) {

  const [inputValue, setInputValue] = useState('');

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <div className="add-task">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={() => {addTask(inputValue); setInputValue('');}}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(item => (
          <li key={item.id} className={item.status === 'completed' ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={item.status === 'completed'}
              onChange={() => toggleTask(item.id)}
            />
            <Link to={`/task/${item.id}`}>
              <span>{item.description}</span>
            </Link>
            <button onClick={() => deleteTask(item.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;