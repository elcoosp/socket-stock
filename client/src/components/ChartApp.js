import React, { Component } from 'react'
import { subscribeToCharts } from '../api'
import LineChart from './LineChart'
import AddStockForm from './AddStockForm'

export default class ChartApp extends Component {
  state = {
    chartsData: null
  }
  componentDidMount = () => {
    subscribeToCharts((e, chartsData) => {
      console.log(e, chartsData)

      this.setState(s => ({
        chartsData
      }))
    })
  }

  render() {
    const { chartsData } = this.state
    return (
      <div className="App">
        {chartsData && <LineChart data={chartsData} />}
        <AddStockForm />
      </div>
    )
  }
}
