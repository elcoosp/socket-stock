import React from 'react'
import styled from 'styled-components'
const Footer = styled.footer`
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 100%);
`

const Text = styled.p`
  text-align: center;
  padding: 10px;
`
const Anchor = styled.a`
  text-decoration: none;
  color: white;
  :link,
  :visited,
  :active {
    color: white;
  }
`
export default () => (
  <Footer>
    <Text>
      Data provided for free by{' '}
      <Anchor target="_blank" href="https://iextrading.com/api-exhibit-a">
        IEX
      </Anchor>, terms of service{' '}
      <Anchor target="_blank" href="https://iextrading.com/api-exhibit-a">
        here
      </Anchor>
    </Text>
  </Footer>
)
