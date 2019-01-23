import React from 'react'
import { Button, Box, Text } from 'grommet'

export default ({ onClick, icon, label, ...props }) => {
  return (
    <Button  hoverIndicator onClick={onClick} >
      <Box pad="xsmall" direction="row" align="center" gap="small" {...props}>
        {icon}
        {label != null ? <Text>{label}</Text> : null}
      </Box>
    </Button>
  )
}



