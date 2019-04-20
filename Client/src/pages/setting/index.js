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
import "./tabs.css";
import SettingServices from 'components/setting_services';

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
          <Box round={{ size: "small" }} background="light-0" pad="medium" margin={{ bottom: 'large' }}>
            <Tabs selectedIndex={currentTabIndex}
              onSelect={currentTabIndex => this.setState({ currentTabIndex })}>
              <TabList>
                <Tab>Services</Tab>
                <Tab>Notification</Tab>
              </TabList>
              <TabPanel>
                {/* Service Setting Tab */}
                <SettingServices />
              </TabPanel>
              <TabPanel>
                {/* Notification Setting Tab */}
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