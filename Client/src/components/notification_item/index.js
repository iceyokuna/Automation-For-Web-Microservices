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

const index = ({ workflowName, title, createdAd, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Notification gap="small" pad="small">
        <Text weight="bold">{workflowName}</Text>
        <Text>{title}</Text>
        <Text size="xsmall" color={dateColor}>
          {moment(createdAd).format('llll')}
        </Text>
      </Notification>
    </Button >
  )
}

export default index
