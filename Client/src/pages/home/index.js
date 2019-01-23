import React, { Component } from 'react'

// import SideMenu from 'components/side_menu';
import AppBar from 'components/app_bar';
import DropMenuInline from 'components/drop_menu_inline'

import { Button, Box, Text } from 'grommet';

import FlowDetail from 'pages/flow_detail'
import ModelWorkflow from 'pages/workflow'
import NotFound from 'pages/not_found'
import MyFlows from 'pages/my_flows';
import CreateFlow from 'pages/create_flow'
import Workflow from 'pages/workflow'
import { Route, Switch } from 'react-router-dom'

import { global } from 'style'

import SideBar from 'components/sidebar';

import PrivateRoute from 'components/private_route'
import Media from 'react-media'

import AnimateHeight from 'react-animate-height';

import { Spring } from 'react-spring'

export default class Home extends Component {
  render() {
    const { match } = this.props;
    return (
      <Box flex fill="vertical">
        <AppBar {...this.props} />
        <Media query="(min-width: 599px)">
          {matches =>
            matches ? (
              <Box direction="row" height='100%'>
                <SideBar {...this.props} />
                <div style={global.globalContainer}>
                  <Switch>
                    <Route exact path={match.url} component={MyFlows} />
                    <Route path={match.url + "/create"} component={CreateFlow} />
                    <Route path={match.url + "/:flow_id/edit_diagram"} component={Workflow} />
                    <Route path={match.url + "/:flow_id"} component={FlowDetail} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Box>
            ) : (
                <Box direction="column" height='100%' style={{ paddingTop: 120 }}>
                  <DropMenuInline />
                  <div style={[global.globalContainer, { paddingLeft: 0, paddingTop: 0, }]}>
                    <Switch>
                      <Route exact path={match.url} component={MyFlows} />
                      <Route path={match.url + "/create"} component={CreateFlow} />
                      <Route path={match.url + "/:flow_id/edit_diagram"} component={Workflow} />
                      <Route path={match.url + "/:flow_id"} component={FlowDetail} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </Box>
              )
          }
        </Media>


      </Box >
    )
  }
}
