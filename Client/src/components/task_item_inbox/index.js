import React from 'react'
import { Box, Text, Button } from 'grommet';

const index = ({ onApprove, onReject, onClick, isEven, ...props }) => {
  return (
    <Box direction="row" margin={{ horizontal: 'medium' }}
      border={{ size: 'xsmall', side: 'bottom', color: 'light-1' }}
      animation={{ delay: props.delay * 100, type: "fadeIn" }}
      pad={{ vertical: 'medium', horizontal: 'xsmall' }} height="50px">
      <Box style={{ flex: 3 }} align="center" justify="center">

        <Button onClick={onClick}>
          <Text weight="bold" truncate>{props.workflowName}</Text>
        </Button>
      </Box>
      <Box style={{ flex: 6 }} align="center" justify="start" direction="row" gap="small">
        <Text weight="bold">[{props.actionType}]</Text>
        <Text >{props.actionDescription}</Text>
      </Box>
      <Box style={{ flex: 2 }} direction="column" align="center" justify="center" >
        <Text size="small">{props.createdAt}</Text>
      </Box>
    </Box>
  )
}

export default index


