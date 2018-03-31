import React, { Component } from 'react'
import { addStockSymbol, subscribeToAddStockSymbolError } from '../api'

export default class AddStockForm extends Component {
  state = {
    stockSymbol: '',
    error: null
  }
  componentDidMount = () =>
    subscribeToAddStockSymbolError(({ error }) =>
      this.setState(s => ({
        error
      }))
    )

  onSubmit = e => {
    const { stockSymbol } = this.state
    e.preventDefault()
    if (stockSymbol.length > 0) {
      addStockSymbol(stockSymbol)
      this.setState(s => ({ stockSymbol: '' }))
    }
  }

  onChange = ({ target: { value } }) =>
    this.setState(s => ({ stockSymbol: value }))

  render() {
    const { error, stockSymbol } = this.state

    return (
      <section>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={stockSymbol} />
          <button>Add a symbol</button>
        </form>
        {error && <p>{error}</p>}
      </section>
    )
  }
}
