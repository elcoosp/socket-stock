import React, { Component } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
export default class Chart extends Component {
  render() {
    console.log(this.props.data)

    return (
      <LineChart width={500} height={300} data={this.props.data}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="close" stroke="#8884d8" />
      </LineChart>
    )
  }
}
