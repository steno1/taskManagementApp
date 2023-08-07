import React, { useState } from 'react'

import AreaCharts from './AreaChart'
import BarCharts from './BarChart'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useAppContext } from '../context/appContext'

const ChartContainer = () => {
  const [areaChart, setAreaChart]=useState(true)
  const {monthlyApplication:data}=useAppContext()
  return (
    <Wrapper>
      <h4 className='monthlyApplication'>Monthly Application</h4>
      <button type='button' className='areaBarChart'
      onClick={()=>setAreaChart(!areaChart)}>
        {areaChart? "Area Chart":"Bar Chart"}
        </button>
      {areaChart? <AreaCharts data={data}/>:<BarCharts data={data}/>}
     
    </Wrapper>
  )
}

export default ChartContainer
