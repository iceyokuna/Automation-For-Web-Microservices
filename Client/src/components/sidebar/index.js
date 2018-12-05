import React, { Component } from 'react'

import { Box, Button } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

export default class SideBar extends Component {

  render() {
    if (this.props.location.pathname === '/my_flows/create_form') return null;
    return (
      <Box width="60px" align="center" elevation='medium' pad={{ top: 'small', bottom: 'small' }}  background='secondary'>
        <Button hoverIndicator icon={<Sort />} />
        <Button hoverIndicator icon={<Group />} />
        <Button hoverIndicator icon={<Performance />} />
      </Box>
    );
  }
}