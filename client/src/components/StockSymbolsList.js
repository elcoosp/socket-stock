import React, { Component } from 'react'
import { Button, toaster } from 'evergreen-ui'
import styled from 'styled-components'
import { removeStockSymbol, subscribeToRemoveStockSymbolError } from '../api'

const List = styled.ul`
  padding: 0;
  width: 50%;
  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;
  align-items: center;
`
const StyledButton = styled(Button)`
  margin: 10px;
`
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
      <List>
        {symbolsName.map(s => (
          <StyledButton
            appearance="red"
            onClick={() => this.remove(s)}
            key={s}
            value={s}
          >
            {s}
          </StyledButton>
        ))}
      </List>
    )
  }
}
