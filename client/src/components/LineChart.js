import React, { Component } from 'react'
import randomColor from 'randomcolor'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
const labelFormatter = data => {
  console.log(data)
  return data
}
export default class Chart extends Component {
  render() {
    const { data } = this.props

    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart height={300} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {/* Create a line for each key in the datapoint (which is not the date key) */}
          {Object.keys(data[0]).map(
            key =>
              key !== 'date' ? (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={datePoint => {
                    return datePoint[key].close
                  }}
                  stroke={randomColor()}
                />
              ) : null
          )}
          <Tooltip labelFormatter={labelFormatter} />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}
