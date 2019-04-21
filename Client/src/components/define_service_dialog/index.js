import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Box,
  Layer,
} from 'grommet'

import { userServicesActions } from 'actions';

import Stepper from 'react-stepper-horizontal';
import Step1 from './step1';
import Step2 from './step2';

const steps = [
  { title: 'Define your service' },
  { title: 'Service interface' },
  { title: 'Submit' },
]

export class index extends Component {

  state = {
    currentStepIndex: 0,
    serviceName: '',
    serviceInfo: '',
    serviceUrl: '',
  }

  onColseDialog = () => {
    this.props.dispatch(userServicesActions.toggleDefineServiceDialog());
  }

  onNextStep = () => {
    this.setState({
      currentStepIndex: this.state.currentStepIndex += 1,
    });
  }


  renderContents = () => {
    const { currentStepIndex } = this.state;
    if (currentStepIndex == 0) return (<Step1 onNextStep={this.onNextStep} />)
    if (currentStepIndex == 1) return (<Step2 onNextStep={this.onNextStep} />)
    if (currentStepIndex == 2) return (<Step1 onNextStep={this.onNextStep} />)
  }

  render() {
    const { userServices } = this.props;
    const { currentStepIndex } = this.state;
    return (
      <Fragment>
        {userServices.showDefineServiceDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="700px" direction="column">
              <Stepper steps={steps} activeStep={currentStepIndex}
              />
              {this.renderContents()}

            </Box>
          </Layer>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userServices: state.userServices,
})

export default connect(mapStateToProps)(index)
