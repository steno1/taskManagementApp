
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


const AreaCharts = ({ data }) => {
  return (
   
    <ResponsiveContainer width='100%' height={300}>
 
      <AreaChart
        data={data}
        margin={{ top: 50 }} 
      >
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='date' />

        <YAxis allowDecimals={false} />

        <Tooltip />
  
        <defs>
          <linearGradient id='areaGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#00B050' stopOpacity={0.8} /> 
            <stop offset='100%' stopColor='#00DD6B' stopOpacity={0.2} /> 
          </linearGradient>
        </defs>
        <Area
          type='monotone'
          dataKey='count' 
          fill='url(#areaGradient)'
          stroke='#00B050'
          strokeWidth={2} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}


export default AreaCharts;
