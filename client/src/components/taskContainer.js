import Loading from './Loading'
import React from 'react'
import Task from './task'
import Wrapper from '../assets/wrappers/taskContainer'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'

const TaskContainer = () => {
  const {getAllTask, tasks, isLoading, numOfPages, totalTasks, page}
  =useAppContext()
  useEffect(()=>{
getAllTask();
  },[])
if(isLoading){
return<Loading center/>
}
if(tasks.length===0){
return ( <Wrapper>
  <h2>No task to display...</h2>
</Wrapper>
)
}
  return (
    <Wrapper>
      <h5>

        {totalTasks} task{tasks.length>1 && "s"} found
      </h5>
      <div className='tasks'>
        {tasks.map((task)=>{
return <Task key={task._id}{...task}/>
        })}
      </div>
    </Wrapper>   
  
  )
}

export default TaskContainer
