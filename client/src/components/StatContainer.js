import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

import React from 'react'
import StatItem from './StatItem'
import Wrapper from '../assets/wrappers/StatsContainer';
import { useAppContext } from '../context/appContext'

const StatContainer = () => {
    const {stat}=useAppContext();
    const defaultStats=[
    {
        title: "In-Progress Tasks",
        count:stat.InProgress || 0,
        color: "#BE5A83",
        bcg: "#DEDEA7",
        icon: <FaSuitcaseRolling/>

    },
    {
        title: "Completed Tasks",
        count: stat.Completed || 0,
        color: "#617A55",
        bcg: "#F8F6F4",
        icon: <FaCalendarCheck/>
    },
    {
        title: "Abandoned Tasks",
        count:stat.Abandoned || 0,
        color: "#7A3E3E",
        bcg: "#9ED2BE",
        icon:<FaBug/>
    }
]
  return (
    <div>
      <Wrapper>
{defaultStats.map((item, index)=>{
return <StatItem key={index} {...item}/>
})}
      </Wrapper>
    </div>
  )
}

export default StatContainer
