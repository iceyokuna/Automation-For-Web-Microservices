import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AddFlowInfo from 'pages/add_flow_info'
import ModelWorkflow from 'pages/workflow'
import CreateForm from 'pages/create_form'

import { global } from 'style'

import { Box } from 'grommet'

import Stepper from 'react-stepper-horizontal'

import appTheme from 'theme';

const colors = appTheme.global.colors;


export default class CreateFlow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeStepIndex: 0
    }
  }

  setActiveIndex = (index) => {
    this.setState({
      activeStepIndex: index
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { location } = nextProps;
    switch (location.pathname) {
      case "/my_flows/create/add_information": {
        this.setActiveIndex(0)
      }; break;
      case "/my_flows/create/design_workflow": {
        this.setActiveIndex(1)
      }; break;
    }

  }


  componentDidMount = () => {
    const { location } = this.props;
    switch (location.pathname) {
      case "/my_flows/create/add_information": {
        this.setActiveIndex(0)
      }; break;
      case "/my_flows/create/design_workflow": {
        this.setActiveIndex(1)
      }; break;
    }

  }


  render() {
    const { match } = this.props;

    return (
      <Box fill flex align="center">
        {/* <div style={{ width: '400px', position: 'absolute' }}>
          <Stepper
            activeColor={colors.brand}
            completeColor={colors.brand}
            steps={[
              { title: 'Information' },
              { title: 'Design Workflow' },
              { title: 'Execute' }]}
            activeStep={this.state.activeStepIndex} />
        </div> */}
        <Route path={match.url + "/add_information"} component={AddFlowInfo} />
        <Route path={match.url + "/design_workflow"} component={ModelWorkflow} />
        <Route path={match.url + "/design_form"} component={CreateForm} />
      </Box>
    )
  }
}
