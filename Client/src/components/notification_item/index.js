import React from 'react'
import { Box, Button, Text } from 'grommet';
import styled from 'styled-components';
import moment from 'moment';

const Notification = styled(Box)`
border-style: solid;
border-width: 0px 0px 1px 0px;
border-color: #bbbbbb;
`

const dateColor = "#666666";

const index = (props) => {
  return (
    <Button hoverIndicator onClick={() => props.onClick(props.workflowId)}>
      <Notification gap="small" pad="small">
        <Text weight="bold">{props.title}</Text>
        <Text>{props.body}</Text>
        <Text size="xsmall" color={dateColor}>
          {`${props.executedDate} ${props.executedTime}`}
        </Text>
      </Notification>
    </Button >
  )
}

export default index
