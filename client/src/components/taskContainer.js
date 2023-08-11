// Import required components and dependencies

import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer'; // Component for pagination buttons
import React from 'react';
import Task from './task';
import Wrapper from '../assets/wrappers/taskContainer';
import { useAppContext } from '../context/appContext'; // Custom context hook
import { useEffect } from 'react';

// Loading component for displaying loading state

 // Import React library
 // Individual task component
 // Wrapper component for styling

 // Import useEffect hook

// Define the TaskContainer component
const TaskContainer = () => {
  // Destructure values from the app context using the custom hook
  const {
    getAllTask,    // Function to fetch tasks
    tasks,         // Array of tasks
    isLoading,     // Boolean indicating if tasks are being fetched
    totalTasks,    // Total count of tasks
    priority,      // Priority filter
    search,        // Search keyword
    searchStatus,  // Search status filter
    sort,          // Sorting option
    numOfPages,// Total number of pages for pagination
    page   
  } = useAppContext();

  // Use useEffect to fetch tasks when component mounts or context variables change
  useEffect(() => {
    getAllTask();  // Fetch tasks using the provided function
    // eslint-disable-next-line
  }, [priority, search, searchStatus, sort, page]);

  // Render loading screen if tasks are being fetched
  if (isLoading) {
    return <Loading center />;  // Display loading component centered
  }

  // Render a message if no tasks are available
  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No task to display...</h2>
      </Wrapper>
    );
  }

  // Render the list of tasks, along with task count and pagination
  return (
    <Wrapper>
      <h5>
        {totalTasks} task{tasks.length > 1 && 's'} found
      </h5>
      <div className='tasks'>
        {/* Map through the tasks array and render individual Task components */}
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
      {/* Conditionally render pagination buttons if there are multiple pages */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TaskContainer;  // Export the TaskContainer component
