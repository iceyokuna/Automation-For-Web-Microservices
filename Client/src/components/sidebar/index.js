import React, { Component } from 'react'

import { Box } from 'grommet';
import { Group, Sort, Performance, Task } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'

const sideBarWidth = 200;
const appBarHeight = 60;

const iconColor = "#ffffff";
const prefix = "/home";

export default class SideBar extends Component {

  state = {
    activeIndex: 0,
  }

  handleSelectMenu = (pathName, selectedIndex) => {
    const { match } = this.props;
    this.props.onSelectMenu(match.url + pathName);
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
        from={{ transform: `translateX(-${sideBarWidth}px)` }}
        enter={{ transform: `translateX(0px)` }}
        leave={{ transform: `translateX(-${sideBarWidth}px)` }}
      >
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
                    color="light-0"
                    background={activeIndex == 0 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/my_tasks', 0)}
                    icon={<Task color={iconColor} />}
                    label="My Tasks" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    color="light-0"
                    background={activeIndex == 1 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/my_flows', 1)}
                    icon={<Sort color={iconColor} />}
                    label="My Flows" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    color="light-0"
                    background={activeIndex == 2 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/my_team', 2)}
                    icon={<Group color={iconColor} />}
                    label="My Team" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    color="light-0"
                    background={activeIndex == 3 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/setting', 3)}
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