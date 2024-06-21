import React from 'react';

const TaskList = ({ tasks, updateTaskStatus, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <select value={task.status} onChange={(e) => updateTaskStatus(task._id, e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
