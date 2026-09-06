import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    if (text.trim() === '') {
      alert('The task field should not be empty');
      return;
    }
    setTasks([...tasks, { id: Date.now(), description: text, status: 'pending' }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id));
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' }
        : item
    ));
  }

  function addComment(taskId, commentText) {
    setTasks(tasks.map(item =>
      item.id === taskId
        ? { ...item, comments: [...(item.comments || []), commentText] }
        : item
    ));
  }


  return (
    <Routes>
      <Route path="/" element={
        <TaskList
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      } />
      <Route path="/task/:id" element={
        <TaskDetail tasks={tasks} addComment={addComment} />
      } />
    </Routes>
  );
}

export default App;