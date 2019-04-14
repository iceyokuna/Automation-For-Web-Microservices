import React from 'react'
import { Box, Button, Text } from 'grommet';

const index = ({ title, body, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Box gap="small" pad="small">
        <Text weight="bold">{title}</Text>
        <Text>{body}</Text>
      </Box>
    </Button >
  )
}

export default index
