import { FaBalanceScale, FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import React from 'react';
import TaskInfo from './taskInfo';
import Wrapper from '../assets/wrappers/task';
import moment from "moment";
import { useAppContext } from '../context/appContext';

const truncateString = (str, maxLength) => {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

const Task = ({ _id, Title, status,priority,Description, createdAt }) => {
  const { setEditTask, deleteTask } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  const truncatedTitle = truncateString(Title, 30);

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{Title.charAt(0)}</div>
        <div className='info'>
          <h5>{truncatedTitle}</h5> {/* Use truncatedTitle here */}
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
        
          <TaskInfo icon={<FaBalanceScale/>} text={priority}/>
          <TaskInfo icon={<FaCalendarAlt/>} text={date}/>
          <div className={`status ${status}`}>{status}</div>
          <div className='description'>
            
            <TaskInfo  text={Description}/>
            
          </div>

        </div>
<footer>
<div className='actions'>
<Link to='/addTask' className='btn edit-btn'
 onClick={(()=>setEditTask(_id))}>

  Edit
</Link>
<button type='button' className='btn delete-btn' 
onClick={()=>deleteTask(_id)}>

  Delete
</button>
</div>

</footer>

      </div>
    </Wrapper>
  );
};

export default Task;
