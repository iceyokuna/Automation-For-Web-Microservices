import React, { Component } from 'react'
import AnimateHeight from 'react-animate-height'

import { FormDown } from 'grommet-icons'
import { Box, Text, Button } from 'grommet'

import { Spring, config } from 'react-spring'

import PlainButton from 'components/plain_button'

export default class DropMenuInline extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isExpand: false,
    }
  }

  render() {
    // const { isExpand } = this.state;
    return (
      <Spring
        from={{
          height: this.props.showMenuBar ? 'auto' : 0,
          opacity: this.props.showMenuBar ? 1 : 0,
        }}
        to={{
          height: this.props.showMenuBar ? 0 : 'auto',
          opacity: this.props.showMenuBar ? 0 : 1,
        }}
        config={config.wobbly}
      >
        {props =>
          <Box style={{ ...props, ...style }} elevation='medium' pad="medium" background="secondary" fill="horizontal" >
            <Box>
              <PlainButton label="My Flows" onClick={this.onClickMenu} />
              <PlainButton label="My Team" onClick={this.onClickMenu} />
              <PlainButton label="Setting" onClick={this.onClickMenu} />
            </Box>
          </Box>}
      </Spring >
    )
  }

  toggleExpand = (e) => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  }


  onClickMenu = (e) => {

  }
}

const style = { position: 'fixed', top: 60, zIndex: 10, }