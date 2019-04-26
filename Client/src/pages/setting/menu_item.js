import React from 'react'
import { Box, Text, Button } from 'grommet';


const menu_item = ({ active, label, onClick }) => {

  const border = active ? {
    side: "left" ,
    size: "medium",
    color: "accent-4",
  }: null

  return (
    <Button onClick={onClick}>
      <Box pad="small"
        border={border}>
        <Text size="medium">{label}</Text>
      </Box>
    </Button>
  )
}

export default menu_item
