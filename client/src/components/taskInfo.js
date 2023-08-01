import React from 'react'
import Wrapper from '../assets/wrappers/taskInfo'

const TaskInfo = ({icon, text, Description}) => {
 return (
 <Wrapper>
  <span className='icon'>{icon}</span>
  <span className='text'>{text}</span>
  {Description && <div className='description'>{Description}</div>}
 </Wrapper>
 )
}

export default TaskInfo
