import React, { Component, Fragment } from 'react'
import { subscribeToCharts, subscribeToChartsDataError } from '../api'
import LineChart from './LineChart'
import AddStockForm from './AddStockForm'
import StockSymbolsList from './StockSymbolsList'

export default class ChartApp extends Component {
  state = {
    chartsData: null,
    error: null
  }
  componentDidMount = () => {
    subscribeToCharts(chartsData => {
      this.setState(s => ({
        chartsData,
        error: null
      }))
    })
    subscribeToChartsDataError(({ error }) => {
      this.setState(s => ({
        chartsData: null,
        error
      }))
    })
  }

  render() {
    const { chartsData, error } = this.state
    console.log(chartsData)

    return (
      <div className="App">
        {chartsData && (
          <Fragment>
            <LineChart data={chartsData} />
            <StockSymbolsList data={chartsData} />
          </Fragment>
        )}
        {error && <p>{error}</p>}

        <AddStockForm />
      </div>
    )
  }
}
