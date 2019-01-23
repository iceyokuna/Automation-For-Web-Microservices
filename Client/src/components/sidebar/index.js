import React, { Component } from 'react'

import { Box, Button } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

export default class SideBar extends Component {
  render() {
    if (this.props.location.pathname === '/my_flows/create_form') return null;
    return (
      <Box style={style} width="60px" height="100%" align="center"
        elevation='xlarge' pad={{ top: 'small', bottom: 'small' }} background='secondary'>
        <Button hoverIndicator icon={<Sort />} />
        <Button hoverIndicator icon={<Group />} />
        <Button hoverIndicator icon={<Performance />} />
      </Box>
    );
  }
}
const style = { position: 'fixed', left: 0, top: 60 }