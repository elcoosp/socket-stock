import React, { Component } from 'react'
import { Button, TextInput, toaster } from 'evergreen-ui'

import { addStockSymbol, subscribeToAddStockSymbolError } from '../api'

export default class AddStockForm extends Component {
  state = {
    stockSymbol: '',
    loading: false
  }
  componentDidMount = () =>
    subscribeToAddStockSymbolError(({ error }) => toaster.warning(error))

  onSubmit = e => {
    const { stockSymbol } = this.state
    e.preventDefault()
    if (stockSymbol.length > 0) {
      addStockSymbol(stockSymbol)
      this.setState(s => ({ stockSymbol: '', loading: true }))
    }
  }

  onChange = ({ target: { value } }) =>
    this.setState(s => ({ stockSymbol: value }))

  render() {
    const { stockSymbol, loading } = this.state

    return (
      <section>
        <form onSubmit={this.onSubmit}>
          <TextInput type="text" onChange={this.onChange} value={stockSymbol} />
          <Button>Add a symbol</Button>
        </form>
        {loading && <p>{loading}</p>}
      </section>
    )
  }
}
