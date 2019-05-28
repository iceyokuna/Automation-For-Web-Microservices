import React from 'react'
import { Box, Text } from 'grommet'

import styled from 'styled-components';

const Button = styled(Box)`
  &:hover {
    background-color: rgba(221,221,221,0.4);
    cursor: pointer;
  }
`

export default ({ onClick, icon, label, ...props }) => {
  return (
    <Button onClick={onClick} pad={props.pad || "xsmall"}
      direction={props.direction || "row"} align={props.align || "center"}
      gap={props.gap || "small"} {...props}>
      {icon}
      {label != null ? <Text size={props.textSize} color={props.color}>{label}</Text> : null}
    </Button>
  )
}



