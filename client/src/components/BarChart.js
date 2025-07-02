
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

const BarCharts = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={{ top: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
      
        <Bar
          
          dataKey="count"
          
          fill="#5B9A8B"
          
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarCharts;
