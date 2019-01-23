import React, { Component } from 'react'

import { Box, Button } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

import { Spring } from 'react-spring'

export default class SideBar extends Component {
  render() {
    if (this.props.location.pathname === '/my_flows/create_form') return null;
    return (
      <Spring
        from={{
          transform: `translateX(-60px)`,
        }}
        to={{
          transform: `translateX(0px)`,
        }}>
        {props =>
          <Box style={{ ...props, ...style }} width="60px" height="100%" align="center"
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