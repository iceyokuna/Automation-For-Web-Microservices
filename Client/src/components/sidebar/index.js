import React, { Component } from 'react'

import { Box, Button } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

import { Spring, config } from 'react-spring'

const sideBarWidth = 60;

export default class SideBar extends Component {
  render() {
    if (this.props.location.pathname === '/my_flows/create_form') return null;
    return (
      <Spring
        from={{
          width: this.props.showMenuBar ? sideBarWidth : 0,
          opacity: this.props.showMenuBar ? 1 : 0,
        }}
        to={{
          width: this.props.showMenuBar ? 0 : sideBarWidth,
          opacity: this.props.showMenuBar ? 0 : 1,
        }}
        config={config.wobbly}
      >
        {props =>
          <Box style={{ ...props, ...style }} width={`${sideBarWidth}px`} height="100%" align="center"
            elevation='xlarge' pad={{ top: 'small', bottom: 'small' }} background='secondary'>
            <Button hoverIndicator icon={<Sort />} />
            <Button hoverIndicator icon={<Group />} />
            <Button hoverIndicator icon={<Performance />} />
          </Box>
        }
      </Spring>
    );
  }
}
const style = { position: 'fixed', left: 0, top: 60 }