import React, { Component } from 'react'
import AnimateHeight from 'react-animate-height'

import { FormDown } from 'grommet-icons'
import { Box, Text, Button } from 'grommet'

import { Spring, config } from 'react-spring'

import PlainButton from 'components/plain_button'

export default class DropMenuInline extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isExpand: false,
    }
  }

  render() {
    const { isExpand } = this.state;
    return (
      <Box style={style} elevation='medium' pad="medium" background="secondary" fill="horizontal">
        <Button onClick={this.toggleExpand} >
          <FormDown />
        </Button>
        <Spring
          from={{
            height: isExpand ? 0 : 'auto',
          }}
          to={{
            height: isExpand ? 'auto' : 0,
          }}
          config={config.wobbly}
        >
          {props =>
            <Box style={props}>
              {isExpand ?
                <Box>
                  <PlainButton label="My Flows" onClick={this.onClickMenu}/>
                  <PlainButton label="My Team" onClick={this.onClickMenu}/>
                  <PlainButton label="Setting" onClick={this.onClickMenu}/>
                </Box> : null}
            </Box>
          }
        </Spring>

      </Box>
    )
  }

  toggleExpand = (e) => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  }


  onClickMenu = (e) => {

  }
}

const style = { position: 'fixed', top: 60 }