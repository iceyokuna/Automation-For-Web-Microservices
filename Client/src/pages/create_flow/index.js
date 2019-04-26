import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AddFlowInfo from 'pages/add_flow_info'
import ModelWorkflow from 'pages/workflow'

import { Box } from 'grommet'

export default class CreateFlow extends Component {

  render() {
    const { match } = this.props;
    console.log(match)
    return (
      <Box fill flex>
        <Route path={match.url + "/add_information"} component={AddFlowInfo} />
        <Route path={match.url + "/design_workflow"} component={ModelWorkflow} />
        {/* <Route exact path={match.url + "/design_form"} component={CreateForm} /> */}
      </Box>
    )
  }
}
