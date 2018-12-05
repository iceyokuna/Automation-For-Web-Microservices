import React, { Component } from 'react'
import AnimateHeight from 'react-animate-height'

import { FormDown } from 'grommet-icons'
import { Box, Text, Button } from 'grommet'


export default class DropMenuInline extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isExpand: false,
      height: 0,
    }
  }

  toggleExpand = (e) => {
    // this.setState({
    //   isExpand: !this.state.isExpand,

    // })

    const { height } = this.state;

    this.setState({
      height: height === 0 ? 'auto' : 0 
    });
  }


  render() {
    const { height } = this.state;
    return (
      <Box elevation='medium' pad='medium' background='secondary'>
        <Button onClick={this.toggleExpand} >
          <FormDown />
        </Button>
        <AnimateHeight height={height} duration={200}>
          <Box margin="small">
            <Text>My Flows</Text>
            <Text>My Team</Text>
            <Text>Setting</Text>
          </Box>
        </AnimateHeight >
      </Box>
    )
  }
}
