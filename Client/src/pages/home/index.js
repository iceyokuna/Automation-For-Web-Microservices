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

import { global, FillParent } from 'style'

import SideBar from 'components/sidebar';

import PrivateRoute from 'components/private_route'
import Media from 'react-media'

export default class Home extends Component {
  state = {
    showMenuBar: false,
  }

  render() {
    const { match } = this.props;
    const { showMenuBar } = this.state;
    return (
      <Box flex fill="vertical">
        <AppBar {...this.props} onToggleMenu={this.toggleMenubar} />
        <Media query="(min-width: 599px)">
          {matches =>
            matches ? (
              <FillParent>
                <SideBar showMenuBar={showMenuBar} {...this.props} />
                <div style={global.globalContainer}>
                  <Switch>
                    <Route exact path={match.url} component={MyFlows} />
                    <Route path={match.url + "/create"} component={CreateFlow} />
                    <Route path={match.url + "/:flow_id/edit_diagram"} component={Workflow} />
                    <Route path={match.url + "/:flow_id"} component={FlowDetail} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </FillParent>
            ) : (
                <FillParent>
                  <DropMenuInline showMenuBar={showMenuBar} {...this.props} />
                  <div style={global.globalContainer}>
                    <Switch >
                      <Route exact path={match.url} component={MyFlows} />
                      <Route path={match.url + "/create"} component={CreateFlow} />
                      <Route path={match.url + "/:flow_id/edit_diagram"} component={Workflow} />
                      <Route path={match.url + "/:flow_id"} component={FlowDetail} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </FillParent>
              )
          }
        </Media>


      </Box >
    )
  }

  toggleMenubar = (e) => {
    this.setState({ showMenuBar: !this.state.showMenuBar });
  }
}
