import React, { Component, Fragment } from 'react'
import { subscribeToCharts, subscribeToChartsDataError } from '../api'
import styled from 'styled-components'
import { toaster } from 'evergreen-ui'
import LineChart from './LineChart'
import AddStockForm from './AddStockForm'
import StockSymbolsList from './StockSymbolsList'
const Layout = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
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
      toaster.warning(error)

      this.setState(s => ({
        chartsData: null
      }))
    })
  }

  render() {
    const { chartsData, error } = this.state

    return (
      <Layout>
        <AddStockForm />

        {chartsData && (
          <Fragment>
            <StockSymbolsList data={chartsData} />

            <LineChart data={chartsData} />
          </Fragment>
        )}
        {error && <p>{error}</p>}
      </Layout>
    )
  }
}
