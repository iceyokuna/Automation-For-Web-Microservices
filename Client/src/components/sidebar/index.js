import React, { Component } from 'react'

import { Box } from 'grommet';
import { Group, Sort, Performance, Task } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'

const sideBarWidth = 200;
const appBarHeight = 60;

const iconColor = "#ffffff";
const menus = ["my_tasks", "my_flows", "my_team", "setting"];

export default class SideBar extends Component {

  state = {
    activeIndex: null,
  }

  handleSelectMenu = (pathName, selectedIndex) => {
    const { match } = this.props;
    this.props.onSelectMenu(match.url + pathName);
    this.setState({
      activeIndex: selectedIndex
    });
  }

  componentDidMount = () => {
    const { location } = this.props;
    const partialUrl = location.pathname.split("/");
    const current = partialUrl[2];

    for (let index in menus) {
      if (menus[index] == current) {
        this.setState({ activeIndex: index });
        break;
      }
    }
  }



  render() {
    const { showMenuBar, history, location } = this.props;
    const { activeIndex } = this.state;
    if (location.pathname === '/my_flows/create_form') return null;
    return (
      <Transition
        config={config.wobbly}
        items={showMenuBar}
        from={{ width: 0, opacity: 0 }}
        enter={{ width: sideBarWidth, opacity: 1 }}
        leave={{ width: 0, opacity: 0 }}
      >
        {toggle =>
          toggle
            ? props =>
              <Box style={props}
                height="100%" align="start"
                elevation="small" pad={{ top: 'medium', bottom: 'medium', left: 'small', right: 'small' }}
                background='dark-1'
                gap="small">
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    color="light-0"
                    background={activeIndex == 0 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/my_tasks', 0)}
                    icon={<Task color={iconColor} />}
                    label="Tasks" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    color="light-0"
                    background={activeIndex == 1 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/my_flows', 1)}
                    icon={<Sort color={iconColor} />}
                    label="Flows" />
                </Box>
                <Box fill="horizontal">
                  <PlainButton hoverIndicator
                    color="light-0"
                    background={activeIndex == 2 ? "light-4" : "default"}
                    onClick={() => this.handleSelectMenu('/my_team', 2)}
                    icon={<Group color={iconColor} />}
                    label="Team" />
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