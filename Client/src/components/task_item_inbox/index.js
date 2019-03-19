import React from 'react'

import { Box, Text, Button } from 'grommet';
import { Checkmark, Close } from 'grommet-icons'

const index = ({ onApprove, onReject, isEven, ...props }) => {
  return (
    <Box round={{ size: "small" }} direction="row"
      background={isEven === true ? "light-0" : "#FFEBEB"} pad="xsmall" height="40px">
      <Box style={{ flex: 2 }} align="center" justify="center">
        <Text weight="bold">{props.workflowName}</Text>
      </Box>
      <Box style={{ flex: 6 }} align="center" justify="start" direction="row" gap="small">
        <Text weight="bold">[{props.actionType}]</Text>
        <Text >{props.actionDescription}</Text>
      </Box>
      <Box style={{ flex: 1 }} direction="row" align="center" justify="center" >
        <Button onClick={() => onApprove()} icon={<Checkmark color="#509137" />} />
        <Button onClick={() => onReject()} icon={<Close color="#F04B37" />} />
      </Box>
    </Box>
  )
}

export default index


