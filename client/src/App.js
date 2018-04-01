import React, { Component } from 'react'
import ChartApp from './components/ChartApp'
import Footer from './components/Footer'
import styled from 'styled-components'

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
class App extends Component {
  render() {
    return (
      <Layout>
        <ChartApp />
        <Footer />
      </Layout>
    )
  }
}

export default App
