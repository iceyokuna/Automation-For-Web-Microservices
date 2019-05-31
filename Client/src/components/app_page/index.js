import React from 'react'
import { Box, Heading } from 'grommet';
import { global } from 'style';

const index = ({ title, children }) => {
  return (
    <div style={global.mainContainer}>
      <Box pad={{ horizontal: 'medium', bottom: 'large' }}>
        <Box direction="row" align="center">
          <Heading size='small' margin={{ right: 'medium' }}>{title}</Heading>
        </Box>
        <Box background="light-0" round={{ size: "small" }} pad="medium">
          {children}
        </Box>
      </Box>
    </div>
  )
}

export default index;