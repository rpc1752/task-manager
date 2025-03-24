import React from "react";

const TaskList = ({ tasks, completeTask }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add a task to get started!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <span>{task.title}</span>
          <button
            onClick={() => completeTask(task.id)}
            disabled={task.completed}
          >
            {task.completed ? "Completed" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
