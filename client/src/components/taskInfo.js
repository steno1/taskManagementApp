import React from 'react';
import Wrapper from '../assets/wrappers/taskInfo';

// Import the React library
 // Import the Wrapper component

// Define the TaskInfo component
const TaskInfo = ({ icon, text, Description }) => {
  return (
    <Wrapper>
      {/* Render the provided icon */}
      <span className='icon'>{icon}</span>
      {/* Render the provided text */}
      <span className='text'>{text}</span>
      {/* Render the Description if it's provided */}
      {Description && <div className='description' >{Description}</div>}
    </Wrapper>
  );
}

export default TaskInfo;  // Export the TaskInfo component
