import React, { Component } from 'react'

import { global, FillParent } from 'style'

import AppBar from 'components/app_bar';
import DropMenuInline from 'components/drop_menu_inline'
import SideBar from 'components/sidebar';
import PrivateRoute from 'components/private_route'

import { Button, Box, Text } from 'grommet';

import FlowDetail from 'pages/flow_detail'
import ModelWorkflow from 'pages/workflow'
import NotFound from 'pages/not_found'
import MyFlows from 'pages/my_flows';
import CreateFlow from 'pages/create_flow'
import Workflow from 'pages/workflow'
import MyTasks from 'pages/my_tasks'
import InboxTaskDetail from 'pages/inbox_task_detail'

import { Route, Switch } from 'react-router-dom'

import Media from 'react-media'

import { history } from '_helpers';

export default class Home extends Component {
  state = {
    showMenuBar: false,
  }

  toggleMenubar = (e) => {
    this.setState({ showMenuBar: !this.state.showMenuBar });
  }

  navigateTo = (pathName) => {
    history.push(pathName);
    this.toggleMenubar();
  }

  renderRoutes = () => {
    const { match } = this.props;

    console.log(match)

    return (
      <div style={global.globalContainer}>
        <Switch>
          <Route exact path={match.url + "/my_tasks"} component={MyTasks} />
          <Route path={match.url + "/my_tasks/:taskId"} component={InboxTaskDetail} />


          <Route exact path={match.url + "/my_flows"} component={MyFlows} />
          <Route path={match.url + "/my_flows/create"} component={CreateFlow} />
          <Route path={match.url + "/my_flows/:flow_id/edit_diagram"} component={Workflow} />
          <Route path={match.url + "/my_flows/:flow_id"} component={FlowDetail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }


  render() {
    const { showMenuBar } = this.state;
    return (
      <Box flex fill="vertical">
        <AppBar {...this.props} onToggleMenu={this.toggleMenubar} />
        <Media query="(min-width: 599px)">
          {matches =>
            matches ? (
              <FillParent>
                <SideBar showMenuBar={showMenuBar}
                  onSelectMenu={(pathName) => this.navigateTo(pathName)} {...this.props} />
                {this.renderRoutes()}
              </FillParent>
            ) : (
                <FillParent>
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
