import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = async (taskId, status) => {
    const updatedTask = await updateTask(taskId, { status });
    setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
  };

  const deleteTaskById = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const filteredTasks = filterStatus === 'All' ? tasks : tasks.filter(task => task.status === filterStatus);

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <div className="task-container">
        <TaskForm addTask={addTask} />
        <div className="task-list-container">
          <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
          <TaskList tasks={filteredTasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTaskById} />
        </div>
      </div>
    </div>
  );
};

export default App;
