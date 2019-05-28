import React from 'react'
import { Box, Button, Text } from 'grommet'

export default function index({ name, executedBy, executedTime, onSelectTask }) {
  return (
    <Box margin={{ vertical: 'small' }}>
      <Button onClick={onSelectTask}>
        <Text size="medium">{name}</Text>
      </Button>
      <Box direction="row" flex justify="between">
        <Text size="small" color="dark-6">{'by ' + executedBy}</Text>
        <Text size="small" color="dark-6">{executedTime}</Text>
      </Box>
    </Box>
  )
}
