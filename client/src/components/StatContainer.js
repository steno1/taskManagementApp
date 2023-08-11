// Importing necessary components and dependencies

import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'; // Importing icons for statistics

import React from 'react'; // Importing React
import StatItem from './StatItem'; // Importing a component to display each statistic item
import Wrapper from '../assets/wrappers/StatsContainer'; // Importing a wrapper component
import { useAppContext } from '../context/appContext'; // Importing the app context for state management

// Defining the StatContainer component
const StatContainer = () => {
  // Extracting the stat data from the app context using the useAppContext hook
  const { stat } = useAppContext();

  // Defining an array of default statistic items
  const defaultStats = [
    {
      title: "In-Progress Tasks",
      count: stat.InProgress || 0,
      color: "#BE5A83",
      bcg: "#DEDEA7",
      icon: <FaSuitcaseRolling /> // Icon representing in-progress tasks
    },
    {
      title: "Completed Tasks",
      count: stat.Completed || 0,
      color: "#617A55",
      bcg: "#F8F6F4",
      icon: <FaCalendarCheck /> // Icon representing completed tasks
    },
    {
      title: "Abandoned Tasks",
      count: stat.Abandoned || 0,
      color: "#7A3E3E",
      bcg: "#9ED2BE",
      icon: <FaBug /> // Icon representing abandoned tasks
    }
  ];

  // Rendering the statistic container
  return (
    <div>
      <Wrapper>
        {/* Mapping through the defaultStats array to display each StatItem */}
        {defaultStats.map((item, index) => {
          return <StatItem key={index} {...item} />; // Passing each item's data as props
        })}
      </Wrapper>
    </div>
  );
};

// Exporting the StatContainer component as the default export
export default StatContainer;
