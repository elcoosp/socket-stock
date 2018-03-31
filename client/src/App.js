import React, { Component } from 'react'
import ChartApp from './components/ChartApp'
import styled from 'styled-components'

const Layout = styled.main`
  width: 100%;
`
class App extends Component {
  render() {
    return (
      <Layout>
        <ChartApp />
      </Layout>
    )
  }
}

export default App
