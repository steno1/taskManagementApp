// Import necessary components from the 'recharts' library

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import React from 'react';

// Import the 'React' object from the 'react' library


// Define a functional component named 'AreaCharts'
// This component takes a 'data' prop that will contain the data for the area chart
const AreaCharts = ({ data }) => {
  return (
    // Create a responsive container to hold the area chart
    <ResponsiveContainer width='100%' height={300}>
      {/* Define the AreaChart component */}
      <AreaChart
        data={data}
        margin={{ top: 50 }} // Margin around the chart
      >
        {/* Add a Cartesian grid to the chart */}
        <CartesianGrid strokeDasharray='3 3' />

        {/* Add an X-axis to the chart */}
        <XAxis dataKey='date' />

        {/* Add a Y-axis to the chart */}
        <YAxis allowDecimals={false} />

        {/* Add a tooltip to display information on data points */}
        <Tooltip />

        {/* Use a linear gradient for the fill */}
        <defs>
          <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#00B050' stopOpacity={0.8} /> {/* Start color */}
            <stop offset='100%' stopColor='#00DD6B' stopOpacity={0.2} /> {/* End color */}
          </linearGradient>
        </defs>

        {/* Add an area to the chart */}
        <Area
          type='monotone' // Type of area chart
          dataKey='count' // Data key for Y-values (count) of the area
          // Reference the defined gradient fill
          fill='url(#areaGradient)'
          stroke='#00B050' // Border color of the area
          strokeWidth={2} // Border width
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Export the 'AreaCharts' component as the default export of this module
export default AreaCharts;
