import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

export default function Form({ onClose, onTaskAdded }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName) return;

    const newTask = { taskName, priority, status: "Not Completed" };

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    onTaskAdded(newTask);

    setTaskName("");
    setPriority("normal");
    onClose();
  };

  return (
    <div className="form p-6 rounded-lg flex-col shadow-md max-w-md mx-auto border-gray-100">
      <div className="flex justify-end">
        <MdOutlineCancel
          onClick={onClose}
          className="text-red-500 text-xl cursor-pointer hover:text-red-700"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-white font-semibold mb-1">
          Task Name
        </label>
        <input
          type="text"
          id="name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add your task"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />

        <label
          htmlFor="priority"
          className="block text-white font-semibold mb-1"
        >
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
