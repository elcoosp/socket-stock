import React from 'react'
import styled from 'styled-components'
const Header = styled.header`
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
  align-self: stretch;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Heading = styled.h1`
  text-align: center;
  color: white;
  padding: 10px;
`

export default () => (
  <Header>
    <Heading>Socket-stock</Heading>
  </Header>
)
