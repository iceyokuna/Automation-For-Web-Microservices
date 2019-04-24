import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
} from 'grommet';

import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';
import { colors } from 'theme'


import { workflowActions } from 'actions';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./tabs.css";

import SettingServices from 'pages/setting_services';
import SettingNotification from 'pages/setting_notification';
import AddService from 'pages/setting_services_add';

import { Route } from 'react-router-dom';

class index extends Component {

  state = {
    currentTabIndex: 0,
    tabs: [
      { tabName: 'Services', tabUrl: '/services', component: SettingServices },
      { tabName: 'Notification', tabUrl: '/notification', component: SettingNotification },
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
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Heading size='small' margin={{ right: 'medium' }}>Setting</Heading>
          <Box round={{ size: "small" }} background="light-0" pad="medium" margin={{ bottom: 'large' }}>
            <Tabs selectedIndex={currentTabIndex}
              onSelect={this.onSelectTab}>
              <TabList>
                <Tab >Services</Tab>
                <Tab >Notification</Tab>
              </TabList>

              <TabPanel>
                <Route exact path={match.url + "/services"} component={SettingServices} />
                <Route path={match.url + "/services/addService"} component={AddService} />
                <Route path={match.url + "/notification"} component={SettingNotification} />
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