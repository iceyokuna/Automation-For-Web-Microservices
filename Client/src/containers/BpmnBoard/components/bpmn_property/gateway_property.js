import React from 'react'
import { Box, Button } from 'grommet'
import { Compare } from 'grommet-icons'


export default ({ onShowConditions }) => (
  <Box gap="small">
    <Button label="Set Conditions" icon={<Compare />} onClick={onShowConditions} />
  </Box>
)
