// Importing necessary components and context

import { Alert } from '../../components';
import React from 'react';
import { useAppContext } from '../../context/appContext';

// AddTask component responsible for adding/editing tasks
const AddTask = () => {
  // Destructuring state and functions from the context
  const {
    Title,
    Description,
    status,
    priority,
    showAlert,
    displayAlert,
    clearValues,
    isEditing,
    handleChanges,
    isLoading,
    createTask,
    clearAlert,
    editTask
  } = useAppContext();

  // Function to handle input changes
  const handleTaskInput = (e) => {
    const { name, value } = e.target;
    handleChanges({ name, value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checking for missing Title or Description, and displaying an alert if necessary
    if (!Title || !Description) {
      displayAlert();
      clearAlert();
      return;
    }

    // If editing a task, call the editTask function
    if (isEditing) {
      editTask();
      return;
    }

    // If not editing, create a new task using createTask function
    createTask();
  };

  return (
    <div className="add-task-container">
      {/* Displaying "Edit Task" or "Add Task" based on the editing mode */}
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <form className="add-task-form" onSubmit={handleSubmit}>
        {/* Displaying an alert if showAlert is true */}
        {showAlert && <Alert />}
        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={Title}
            onChange={handleTaskInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <textarea
            id="Description"
            name="Description"
            value={Description}
            onChange={handleTaskInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleTaskInput}
          >
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
            <option value="Abandoned">Abandoned</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={handleTaskInput}
          >
            <option value="High">High</option>
            <option value="Average">Average</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Button to add a task, disabled when loading */}
        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          Add Task
        </button>

        {/* Button to clear input values */}
        <button
          type="button"
          className="clear-button"
          onClick={(e) => {
            e.preventDefault();
            clearValues();
            console.log('clear');
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default AddTask;
