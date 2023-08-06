import { ChartContainer, Loading, StatContainer } from '../../components'

import React from 'react'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const Stat = () => {
  const {showStat, isLoading, monthlyApplication}=useAppContext();
  useEffect(()=>{
showStat();
  }, [])
  if(isLoading){
    return <Loading center/>
  }
  return (
   <>
   <StatContainer/>
   {monthlyApplication.length>0 && 
   <ChartContainer/>
   }
   
   </>
  )
}

export default Stat
