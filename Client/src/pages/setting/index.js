import React, { Component } from 'react'

import {
  Box,
  Heading,
} from 'grommet';

import { global } from 'style';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import "./tabs.css";

import SettingServices from 'pages/setting_services';
import SettingNotification from 'pages/setting_notification';
import AddService from 'pages/setting_services_add';
import ServiceInfo from 'pages/service_info';

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
    const { currentTabIndex, } = this.state;
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
                <Route path={match.url + "/services/info"} component={ServiceInfo} />
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

export default index;