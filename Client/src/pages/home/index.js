import React, { Component } from 'react'

import { global, FillParent } from 'style'

import AppBar from 'components/app_bar';
import DropMenuInline from 'components/drop_menu_inline'
import SideBar from 'components/sidebar';

import { Box, } from 'grommet';

import FlowDetail from 'pages/flow_detail'
import CreateForm from 'pages/create_form'
import NotFound from 'pages/not_found'
import MyFlows from 'pages/my_flows';
import CreateFlow from 'pages/create_flow'
import Workflow from 'pages/workflow'
import MyTasks from 'pages/my_tasks'
import InboxTaskDetail from 'pages/inbox_task_detail'
import Setting from 'pages/setting'

import { Route, Switch, } from 'react-router-dom'

import Media from 'react-media'

import { history, askForPermissioToReceiveNotifications } from '_helpers';
import { notificationServices } from 'services'

export default class Home extends Component {
  state = {
    showMenuBar: false,
  }

  componentDidMount() {
    askForPermissioToReceiveNotifications().then(fcmToken => {
      console.log("fcmToken = " + fcmToken);
      notificationServices.setFCMToken(fcmToken).then(
        res => {
          console.log("Set fcmToken");
        }
      )
    }).catch(err => {
      console.error(err);
    });
  }


  toggleMenubar = (e) => {
    this.setState({ showMenuBar: !this.state.showMenuBar });
  }

  navigateTo = (pathName) => {
    const { match } = this.props;
    history.push(pathName);
    // this.toggleMenubar();
  }

  renderRoutes = () => {
    const { match } = this.props;
    console.log(match);
    return (
      <div style={global.globalContainer}>
        <Switch>
          <Route exact path={"/my_flows"} component={MyFlows} />
          <Route path={"/my_flows/create"} component={CreateFlow} />
          <Route path={"/my_flows/:flow_id/edit_diagram"} component={Workflow} />
          <Route path={"/my_flows/:flow_id"} component={FlowDetail} />
          <Route exact path={"/my_tasks"} component={MyTasks} />
          <Route exact path={"/design_form"} component={CreateForm} />
          <Route path={"/my_tasks/:taskId"} component={InboxTaskDetail} />
          <Route path={"/setting"} component={Setting} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }


  render() {
    const { showMenuBar } = this.state;
    return (
      <Box flex fill="vertical">
        <AppBar {...this.props} showMenuBar={showMenuBar}
          onToggleMenu={this.toggleMenubar} />
        <Media query="(min-width: 599px)">
          {matches =>
            matches ? (
              <FillParent style={{ paddingTop: 60 }}>
                <Box fill direction="row">
                  <SideBar showMenuBar={showMenuBar}
                    onSelectMenu={(pathName) => this.navigateTo(pathName)} {...this.props} />
                  {this.renderRoutes()}
                </Box>

              </FillParent>
            ) : (
                <FillParent style={{ paddingTop: 60 }}>
                  <DropMenuInline showMenuBar={showMenuBar}
                    onSelectMenu={(pathName) => this.navigateTo(pathName)} {...this.props} />
                  {this.renderRoutes()}
                </FillParent>
              )
          }
        </Media>
      </Box >
    )
  }
}
