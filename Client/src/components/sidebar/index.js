import React, { Component } from 'react'

import { Box } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'

const sideBarWidth = 200;
const appBarHeight = 60;

export default class SideBar extends Component {

  render() {
    const { showMenuBar } = this.props;
    if (this.props.location.pathname === '/my_flows/create_form') return null;
    return (
      <Transition
        items={showMenuBar}
        from={{ width: 0, opacity: 0 }}
        enter={{ width: sideBarWidth, opacity: 1 }}
        leave={{ width: 0, opacity: 0 }}
        config={config.wobbly}>
        {toggle =>
          toggle
            ? props => <Box style={{ ...props, ...style }} width={`${sideBarWidth}px`} height="100%" align="start"
              elevation='xlarge' pad={{ top: 'medium', bottom: 'medium', left: 'small', right: 'small' }} background='secondary'>
              <Box fill="horizontal"><PlainButton hoverIndicator icon={<Sort />} label="My Flows" /></Box>
              <Box fill="horizontal"><PlainButton hoverIndicator icon={<Group />} label="My Team" /></Box>
              <Box fill="horizontal"><PlainButton fhoverIndicator icon={<Performance />} label="Setting" /></Box>
            </Box>
            : null
        }
      </Transition>
    );
  }
}
const style = { position: 'fixed', left: 0, top: appBarHeight, zIndex: 10 }