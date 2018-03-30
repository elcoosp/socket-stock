import React, { Component } from 'react'
import { addStockSymbol, subscribeToAddStockSymbolError } from '../api'

export default class AddStockForm extends Component {
  state = {
    stockSymbol: '',
    error: null
  }
  componentDidMount = () => {
    subscribeToAddStockSymbolError(({ error }) =>
      this.setState(s => ({
        error
      }))
    )
  }

  onSubmit = e => {
    e.preventDefault()
    addStockSymbol(this.state.stockSymbol)
  }
  onChange = ({ target: { value } }) =>
    this.setState(s => ({ stockSymbol: value }))

  render() {
    const { chartsData, error } = this.state
    console.log(error)

    return (
      <section>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} />
          <button>Add a symbol</button>
        </form>
        {error && <p>{error}</p>}
      </section>
    )
  }
}
