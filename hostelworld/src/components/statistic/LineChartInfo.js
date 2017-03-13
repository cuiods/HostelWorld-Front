import React, { PropTypes } from 'react'
import styles from './lineChart.less'
import {color} from '../../utils'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

function LineChartInfo ({ data }) {
  return (
    <div className={styles.sales}>
      <div className={styles.title}>本周预约和入住统计</div>
      <ResponsiveContainer minHeight={340}>
        <LineChart data={data}>
          <Legend verticalAlign='top'
            content={props => {
              const { payload } = props;
              return <ul className={styles.legend + ' clearfix'}>
                {payload.map((item, key) => <li key={key}><span className={styles.radiusdot} style={{background: item.color}} />{item.value}</li>) }
              </ul>
            }} />
          <XAxis dataKey='name' axisLine={{stroke: color.borderBase, strokeWidth: 1}} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid vertical={false} stroke={color.borderBase} strokeDasharray='3 3' />
          <Tooltip
            wrapperStyle={{border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)'}}
            content={content => {
              const list = content.payload.map((item, key) => <li key={key} className={styles.tipitem}><span className={styles.radiusdot} style={{background: item.color}} />{item.name + ':' + item.value}</li>)
              return <div className={styles.tooltip}><p className={styles.tiptitle}>{content.label}</p><ul>{list}</ul></div>
            }} />
          <Line type='monotone' dataKey='reserve' stroke={color.purple} strokeWidth={3} dot={{fill: color.purple}} activeDot={{r: 5, strokeWidth: 0}} />
          <Line type='monotone' dataKey='check' stroke={color.red} strokeWidth={3} dot={{fill: color.red}} activeDot={{r: 5, strokeWidth: 0}} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

LineChartInfo.propTypes = {
  data: PropTypes.array
};

export default LineChartInfo
