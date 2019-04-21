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
import SettingServices from 'pages/setting_services';
import { Route } from 'react-router-dom';

class index extends Component {

  state = {
    currentTabIndex: 0,
    tabs: [
      { tabName: 'Services', tabUrl: '/services' },
      { tabName: 'Notification', tabUrl: '/notification' },
    ]
  }

  onSelectMenu = (menu) => {
    this.setState({ currentMenu: menu });
  }


  onSelectTab = (currentTabIndex) => {
    const { tabs } = this.state;
    const { match } = this.props;
    this.setState({ currentTabIndex });
    this.props.history.push(match.url + tabs[currentTabIndex].tabUrl);
  }


  render() {
    const { currentTabIndex, tabs } = this.state;
    const { match } = this.props;
    console.log(match)
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Heading size='small' margin={{ right: 'medium' }}>Setting</Heading>
          <Box round={{ size: "small" }} background="light-0" pad="medium" margin={{ bottom: 'large' }}>
            <Tabs selectedIndex={currentTabIndex}
              onSelect={this.onSelectTab}>
              <TabList>
                {tabs.map((item, index) =>
                  <Tab >{item.tabName}</Tab>
                )}
              </TabList>
              <TabPanel>
                <Route path={match.url + "/services"} component={SettingServices} />
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