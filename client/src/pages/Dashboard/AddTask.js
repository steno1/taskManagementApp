

import { Alert } from '../../components';
import React from 'react';
import { useAppContext } from '../../context/appContext';

const AddTask = () => {
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

  const handleTaskInput = (e) => {
    const { name, value } = e.target;
    handleChanges({ name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Title || !Description) {
      displayAlert();
      clearAlert();
      return;
    }

    if (isEditing) {
      editTask();
      return;
    }

    createTask();
  };

  return (
    <div className="add-task-container">
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <form className="add-task-form" onSubmit={handleSubmit}>
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
            <option value="InProgress">InProgress</option>
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

        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          Add Task
        </button>

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
