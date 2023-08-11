import React from 'react'; // Importing React
import Wrapper from '../assets/wrappers/StatItem'; // Importing a wrapper component for the StatItem

// Defining the StatItem component
const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}> {/* Applying the specified color and background color */}
      <header>
        {/* Displaying the count of the statistic */}
        <span className='count'>{count}</span>
        {/* Displaying the icon associated with the statistic */}
        <span className='icon'>{icon}</span>
      </header>
      {/* Displaying the title of the statistic */}
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

// Exporting the StatItem component as the default export
export default StatItem;
