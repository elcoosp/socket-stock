import React from 'react'

import { lowerCase, capitalize } from 'lodash'
import styled from 'styled-components'
const TooltipContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  max-width: 500px;
`
const TooltipPayload = styled.div`
  color: ${p => p.color && p.color};
`

const RowList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  border-radius: 5px;
`

const RowListItem = styled.li`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`
const CustomizedTooltip = ({ payload, label }) => {
  const payloadData = payload[0] ? payload[0].payload : null

  if (payloadData) {
    return (
      <TooltipContainer>
        {Object.keys(payloadData).map((key, i) => {
          return key !== 'date' ? (
            <TooltipPayload
              key={key}
              color={payload[i - 1] && payload[i - 1].stroke}
            >
              {key} :
              <RowList>
                {Object.keys(payloadData[key]).map(k => (
                  <RowListItem key={k}>
                    {capitalize(lowerCase(k))} : {payloadData[key][k]}
                  </RowListItem>
                ))}
              </RowList>
            </TooltipPayload>
          ) : null
        })}
      </TooltipContainer>
    )
  } else return null
}

export default CustomizedTooltip
