import React, { Component } from 'react'

import { Box, } from 'grommet';

import Stepper from 'react-stepper-horizontal';
import Step1 from './step1';
import Step2 from './step2';
import { colors } from 'theme';

import { toast } from 'react-toastify'

export default class index extends Component {
  state = {
    currentStepIndex: 0,
    serviceName: '',
    serviceInfo: '',
    serviceUrl: '',
  }


  onNextStep = () => {
    this.setState({
      currentStepIndex: this.state.currentStepIndex + 1,
    });
  }

  onSubmitService = () => {
    toast.success("Your service is added");
    this.props.history.replace('/home/setting/services');
  }

  onClickStep = (index) => {
    this.setState({
      currentStepIndex: index,
    })
  }

  renderContents = () => {
    const { currentStepIndex } = this.state;
    if (currentStepIndex === 0) return (
      <Step1 onNextStep={this.onNextStep} />)
    if (currentStepIndex === 1) return(
    <Step2 onNextStep={this.onNextStep}
      onSubmitService={this.onSubmitService} />)
  }

  render() {
    const { currentStepIndex } = this.state;
    return (
      <Box pad="small" gap="small" fill direction="column">
        <Stepper steps={[
          { title: 'Define your service', onClick: () => this.onClickStep(0) },
          { title: 'Service interface', onClick: () => this.onClickStep(1) },
          { title: 'Done', },
        ]} activeStep={currentStepIndex}
          activeColor={colors.brand} completeColor={colors.brand}
          completeBarColor={colors.brand}
        />
        {this.renderContents()}

      </Box>
    )
  }
}