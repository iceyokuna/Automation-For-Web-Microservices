import React, { Component } from 'react'

import { Box } from 'grommet';
import { Group, Sort, Performance } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'
import { Container } from './style'

const sideBarWidth = 200;
const appBarHeight = 60;

const iconColor = "#ffffff";



export default class FloatDropdown extends Component {
  state = {
    show: true,
  }

  a = 15;

  toggleMenu = (params) => {
    this.setState({ show: !this.state.show });
  }


  render() {
    const { show } = this.state;

    return (
      <Container >
        <Transition
          items={show}
          from={{ width: 0, opacity: 0 }}
          enter={{ width: sideBarWidth, opacity: 1 }}
          leave={{ width: 0, opacity: 0 }}
          config={config.wobbly}>
          {toggle =>
            toggle
              ? props =>

                <Box style={{ ...style }}
                  width={`${sideBarWidth}px`}
                  height="100%" align="start"
                  elevation='xlarge' pad={{ top: 'medium', bottom: 'medium', left: 'small', right: 'small' }}
                  background='secondary' responsive={false}>
                  {this.a}
                </Box>
              : null
          }
        </Transition>
      </Container>
    );
  }
}
const style = { position: 'fixed', left: 0, top: appBarHeight, zIndex: 10 }