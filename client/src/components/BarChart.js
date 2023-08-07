// Import necessary components from the 'recharts' library

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import React from 'react';

// Import the 'React' object from the 'react' library


// Define a functional component named 'BarCharts'
// This component takes a 'data' prop that will contain the data for the bar chart
const BarCharts = ({ data }) => {
  return (
    // Create a responsive container to hold the bar chart
    <ResponsiveContainer width='100%' height={300}>
      {/* Define the BarChart component */}
      <BarChart
        // Provide the data for the chart using the 'data' prop
        data={data}
        // Define margins around the chart
        margin={{ top: 50 }}
      >
        {/* Add a Cartesian grid to the chart */}
        <CartesianGrid strokeDasharray="3 3" />
        {/* Add an X-axis to the chart */}
        <XAxis dataKey="date" />
        {/* Add a Y-axis to the chart */}
        <YAxis allowDecimals={false} />
        {/* Add a tooltip to display information on data points */}
        <Tooltip />
        {/* Add a bar to the chart */}
        <Bar
          // Specify the data key for the Y-values (count) of the bar
          dataKey="count"
          // Specify the fill color for the bar
          fill="#5B9A8B"
          // Specify the width/size of the bars
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Export the 'BarCharts' component as the default export of this module
export default BarCharts;
