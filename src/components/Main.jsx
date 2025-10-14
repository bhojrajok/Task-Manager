import React, { useState, useEffect } from "react";
import Form from "./Form";

export default function Main() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState("All");
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleTaskAdded = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleMarkDone = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === "Done" ? "Pending" : "Done",
        };
      }
      return task;
    });
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleFilterChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) => filterPriority === "All" || task.priority === filterPriority
  );

  return (
    <>
      <div className="rounded main">
        <div className="flex justify-between items-center mb-4">
          <button
            className="actionbtn hover:scale-105 transition-all"
            onClick={() => setShowForm(true)}
          >
            Add Task..
          </button>
          <div>
            <select
              className="filter-select sort"
              onChange={handleFilterChange}
              value={filterPriority}
            >
              <option value="All">All</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>

        <div className="quote mb-4">
          <p>
            "The only way to do great work is to love what you do." – Steve Jobs
          </p>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-5">Task Name</th>
              <th className="p-5">Status</th>
              <th className="p-5">Priority</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className={`${
                    task.status !== "Done" ? "hover:bg-gray-600" : ""
                  }`}
                >
                  <td
                    className={`p-2 ${
                      task.status === "Done" ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.taskName}
                  </td>
                  <td
                    className={`p-2 ${
                      task.status === "Done" ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.status}
                  </td>
                  <td
                    className={`p-2 ${
                      task.status === "Done" ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <span
                      className={`task-priority-dot ${
                        task.priority === "high"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    ></span>
                    {task.priority === "high" ? "High" : "Normal"}
                  </td>
                  <td className="p-2">
                    {task.status !== "Done" ? (
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleMarkDone(task.id)}
                        title="Mark as Done"
                      >
                        ✅
                      </button>
                    ) : (
                      <span className="text-gray-500" title="Task Completed">
                        Task Completed
                      </span>
                    )}

                    <button
                      className="text-red-600 hover:text-red-800 ml-2"
                      onClick={() => handleTaskDelete(task.id)}
                      title="Delete Task"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="relative w-full bg-gray-200 rounded-full h-2">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
            style={{
              width: `${
                filteredTasks.length > 0
                  ? (filteredTasks.filter((task) => task.status === "Done")
                      .length /
                      filteredTasks.length) *
                    100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="modal-container">
            <Form
              onClose={() => setShowForm(false)}
              onTaskAdded={handleTaskAdded}
            />
          </div>
        </div>
      )}
    </>
  );
}
