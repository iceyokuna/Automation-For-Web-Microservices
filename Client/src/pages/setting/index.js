import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
  Tabs,
  Tab,
} from 'grommet';

import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';
import { colors } from 'theme'
import MenuItem from './menu_item'


import { workflowActions } from 'actions';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

class index extends Component {

  state = {
    currentMenu: "Services",
  }

  onSelectMenu = (menu) => {
    this.setState({ currentMenu: menu });
  }


  render() {
    const { currentMenu } = this.state
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Heading size='small' margin={{ right: 'medium' }}>Setting</Heading>
          <Row >
            <Col xs={12} sm={12} md={3} lg={3}>
              <Box round={{ size: "small" }} background="light-0" pad="medium">
                <MenuItem label="Services" active={currentMenu === "Services"}
                  onClick={() => this.onSelectMenu("Services")} />
                <MenuItem label="Notification" active={currentMenu === "Notification"}
                  onClick={() => this.onSelectMenu("Notification")} />
              </Box>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <Box pad="medium">

              </Box>
            </Col>
          </Row>

        </Box>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflowMyFlows: state.workflowMyFlows,
  }
}

export default connect(null)(index);