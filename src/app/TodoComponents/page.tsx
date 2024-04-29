import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

export const  TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.taskName);
        }}
      >
        X
      </button>
    </div>
  );
};


export const  TodoTaskList = ({ task, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.task_name}</span>
        <span>{task.date}</span>
        <span>{task.teacher}</span>
        <span>{task.student}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.task_name);
        }}
      >
        X
      </button>
    </div>
  );
};
