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

const index = ({ title, body, createdAt, workflowId, onClick }) => {
  return (
    <Button hoverIndicator onClick={() => onClick(workflowId)}>
      <Notification gap="small" pad="small">
        <Text weight="bold">{title}</Text>
        <Text>{body}</Text>
        <Text size="xsmall" color={dateColor}>
          {createdAt}
        </Text>
      </Notification>
    </Button >
  )
}

export default index
