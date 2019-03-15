import React, { Component } from 'react'

import { Box } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'

const sideBarWidth = 200;
const appBarHeight = 60;

const iconColor = "#ffffff";

export default class SideBar extends Component {

  state = {
    activeIndex: 0,
  }

  handleSelectMenu = (pathName, selectedIndex) => {
    this.props.onSelectMenu(pathName);
    this.setState({
      activeIndex: selectedIndex
    });
  }


  render() {
    const { showMenuBar, history, location } = this.props;
    const { activeIndex } = this.state;
    if (location.pathname === '/my_flows/create_form') return null;
    return (
      <Transition
        items={showMenuBar}
        from={{ width: 0, opacity: 0 }}
        enter={{ width: sideBarWidth, opacity: 1 }}
        leave={{ width: 0, opacity: 0 }}
        config={config.wobbly}>
        {toggle =>
          toggle
            ? props =>
              <Box style={{ ...props, ...style }}
                width={`${sideBarWidth}px`}
                height="100%" align="start"
                elevation="small" pad={{ top: 'medium', bottom: 'medium', left: 'small', right: 'small' }}
                background='dark-1' responsive={false}
                gap="small">
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    background={activeIndex == 0 ? "light-4" : "dark-1"}
                    onClick={() => this.handleSelectMenu('/my_flows', 0)}
                    icon={<Sort color={iconColor} />}
                    label="My Flows" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    background={activeIndex == 1 ? "light-4" : "dark-1"}
                    onClick={() => this.handleSelectMenu('/my_team', 1)}
                    icon={<Group color={iconColor} />}
                    label="My Team" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    background={activeIndex == 2 ? "light-4" : "dark-1"}
                    onClick={() => this.handleSelectMenu('/setting', 2)}
                    icon={<Performance color={iconColor} />}
                    label="Setting" />
                </Box>
              </Box>
            : null
        }
      </Transition>
    );
  }
}
const style = { position: 'fixed', left: 0, top: appBarHeight, zIndex: 10, }