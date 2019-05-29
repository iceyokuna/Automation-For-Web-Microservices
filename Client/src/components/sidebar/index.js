import React, { Component } from 'react'

import { Box } from 'grommet';
import { Group, Sort, Performance, Task } from 'grommet-icons';

import { Transition, } from 'react-spring'
import PlainButton from 'components/plain_button'

const sideBarWidth = 200;

const iconColor = "#ffffff";
const menus = [
  { label: "Flows", link: "my_flows", icon: <Sort color={iconColor} /> },
  { label: "Tasks", link: "my_tasks", icon: <Task color={iconColor} /> },
  // { label: "Team", link: "my_team", icon: <Group color={iconColor} /> },
  { label: "Services", link: "services", icon: <Performance color={iconColor} /> },];

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

  componentDidMount = () => {
    const { location } = this.props;
    const partialUrl = location.pathname.split("/");
    const current = partialUrl[1];

    for (let index in menus) {
      if (menus[index] === current) {
        this.setState({ activeIndex: index });
        break;
      }
    }
  }

  render() {
    const { showMenuBar, location } = this.props;
    const { activeIndex } = this.state;
    if (location.pathname === '/my_flows/create_form') return null;
    return (
      <Transition
        items={showMenuBar}
        from={{ width: 0, opacity: 0 }}
        enter={{ width: sideBarWidth, opacity: 1 }}
        leave={{ width: 0, opacity: 0 }}
      >
        {toggle =>
          toggle
            ? props =>
              <div style={props}>
                <Box
                  height="100%" align="start"
                  elevation="small" pad={{ top: 'medium', bottom: 'medium', left: 'small', right: 'small' }}
                  background='dark-1'
                  justify="center"
                >
                  {menus.map((menu, index) =>
                    <Box fill="horizontal">
                      <PlainButton hoverIndicator
                        color="light-0"
                        pad="medium"
                        textSize="medium"
                        background={activeIndex == index ? "light-4" : "default"}
                        onClick={() => this.handleSelectMenu(`/${menu.link}`, index)}
                        icon={menu.icon}
                        label={menu.label} />
                    </Box>)}
                </Box>
              </div>
            : null
        }
      </Transition>
    );
  }
}