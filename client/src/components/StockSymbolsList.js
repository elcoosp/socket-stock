import React, { Component } from 'react'
import { removeStockSymbol, subscribeToRemoveStockSymbolError } from '../api'

export default class StockSymbolsList extends Component {
  state = {
    error: null
  }
  componentDidMount = () => {
    subscribeToRemoveStockSymbolError(({ error }) =>
      this.setState(s => ({
        error
      }))
    )
  }

  remove = name => {
    removeStockSymbol(name)
  }

  render() {
    const { data } = this.props
    const symbolsName = Object.keys(data[0]).filter(v => v !== 'date')
    return (
      <section>
        <ul>
          {symbolsName.map(s => (
            <li onClick={() => this.remove(s)} key={s} value={s}>
              {s}
            </li>
          ))}
        </ul>
        {this.state.error && <p>{this.state.error}</p>}
      </section>
    )
  }
}
