import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
} from 'grommet';

import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';
import { colors } from 'theme'
import MenuItem from './menu_item'


import { workflowActions } from 'actions';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class index extends Component {

  state = {
    currentTabIndex: 0,
  }

  onSelectMenu = (menu) => {
    this.setState({ currentMenu: menu });
  }


  render() {
    const { currentTabIndex } = this.state
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Heading size='small' margin={{ right: 'medium' }}>Setting</Heading>
          <Box round={{ size: "small" }} background="light-0" pad="medium">
            {/* <MenuItem label="Services" active={currentMenu === "Services"}
                  onClick={() => this.onSelectMenu("Services")} />
                <MenuItem label="Notification" active={currentMenu === "Notification"}
                  onClick={() => this.onSelectMenu("Notification")} /> */}
            <Tabs selectedIndex={currentTabIndex}
              onSelect={currentTabIndex => this.setState({ currentTabIndex })}>
              <TabList>
                <Tab>Services</Tab>
                <Tab>Notification</Tab>
              </TabList>

              <TabPanel>
                <h2>Any content 1</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
          </Box>
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