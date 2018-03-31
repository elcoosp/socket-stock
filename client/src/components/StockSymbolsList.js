import React, { Component } from 'react'
import { Button, TextInput, toaster } from 'evergreen-ui'

import { removeStockSymbol, subscribeToRemoveStockSymbolError } from '../api'

export default class StockSymbolsList extends Component {
  componentDidMount = () => {
    subscribeToRemoveStockSymbolError(({ error }) => toaster.warning(error))
  }

  remove = name => {
    removeStockSymbol(name)
  }

  render() {
    const { data } = this.props
    const symbolsName = Object.keys(data[0]).filter(v => v !== 'date')
    return (
      <ul>
        {symbolsName.map(s => (
          <Button
            appearance="red"
            onClick={() => this.remove(s)}
            key={s}
            value={s}
          >
            {s}
          </Button>
        ))}
      </ul>
    )
  }
}
