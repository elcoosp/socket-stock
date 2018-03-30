import React, { Component } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import { log } from 'util'
export default class Chart extends Component {
  getDate = data => data.data.date
  render() {
    const { data } = this.props
    console.log(data)

    return (
      <LineChart width={500} height={300} data={data}>
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
                stroke="#8884d8"
              />
            ) : null
        )}
      </LineChart>
    )
  }
}
