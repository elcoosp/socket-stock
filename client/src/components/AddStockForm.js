import React, { Component } from 'react'
import { addStockSymbol } from '../api'

export default class AddStockForm extends Component {
  state = {
    stockSymbol: ''
  }
  onSubmit = e => {
    e.preventDefault()
    addStockSymbol(this.state.stockSymbol)
  }
  onChange = ({ target: { value } }) =>
    this.setState(s => ({ stockSymbol: value }))

  render() {
    const { chartsData } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" onChange={this.onChange} />
        <button>Add a symbol</button>
      </form>
    )
  }
}
