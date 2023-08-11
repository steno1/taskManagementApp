// Importing necessary components, dependencies, and functions

import { FaBalanceScale, FaCalendarAlt } from 'react-icons/fa'; // Importing icons for task information

import { Link } from 'react-router-dom'; // Importing Link for navigation
import React from 'react'; // Importing React
import TaskInfo from './taskInfo'; // Importing a component to display task information
import Wrapper from '../assets/wrappers/task'; // Importing a wrapper component
import moment from 'moment'; // Importing moment library for date formatting
import { useAppContext } from '../context/appContext'; // Importing the app context for state management

// Function to truncate a string to a certain length
const truncateString = (str, maxLength) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

// Defining the Task component
const Task = ({ _id, Title, status, priority, Description, createdAt }) => {
  // Extracting necessary functions from the app context using the useAppContext hook
  const { setEditTask, deleteTask } = useAppContext();

  // Formatting the creation date using the moment library
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  // Truncating the title to a certain length
  const truncatedTitle = truncateString(Title, 30);

  // Rendering the task component
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{Title.charAt(0)}</div>
        <div className='info'>
          {/* Displaying the truncated title */}
          <h5>{truncatedTitle}</h5>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          {/* Displaying task information using the TaskInfo component */}
          <TaskInfo icon={<FaBalanceScale />} text={priority} />
          <TaskInfo icon={<FaCalendarAlt />} text={date} />
          {/* Displaying the status of the task */}
          <div className={`status ${status}`}>{status}</div>
          <div className='description'>
            {/* Displaying the task description using the TaskInfo component */}
            <TaskInfo text={Description} />
          </div>
        </div>
        <footer>
          <div className='actions'>
            {/* Link to the 'addTask' route with the setEditTask function */}
            <Link
              to='/addTask'
              className='btn edit-btn'
              onClick={() => setEditTask(_id)}
            >
              Edit
            </Link>
            {/* Button to delete the task */}
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

// Exporting the Task component as the default export
export default Task;
