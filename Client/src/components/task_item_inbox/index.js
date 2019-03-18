import React from 'react'

import { Box, Text, Button } from 'grommet';
import { Checkmark, Close } from 'grommet-icons'

const index = ({ ...props }) => {
  return (
    <Box round={{ size: "small" }} direction="row" background="light-0" pad="xsmall" height="40px">
      <Box flex={{ grow: 2 }} align="center" justify="center">
        <Text textAlign="center">Test</Text>
      </Box>
      <Box flex={{ grow: 6 }} align="center" justify="center" >
        <Text textAlign="center">Test</Text>
      </Box>
      <Box flex={{ grow: 1 }} direction="row" align="center" justify="center" >
        <Text textAlign="center">Test</Text>
        <Button icon={<Checkmark />} />
        <Button icon={<Close />} />
      </Box>
    </Box>
  )
}

export default index


