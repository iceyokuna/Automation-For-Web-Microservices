import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Heading, Text, Box, Button,
  Layer, TextInput, FormField,
  TextArea
} from 'grommet'

import { userServicesActions } from 'actions';

import Stepper from 'react-stepper-horizontal'

export class index extends Component {

  state = {
    serviceName: '',
    serviceInfo: '',
    serviceUrl: '',
  }

  onColseDialog = () => {
    this.props.dispatch(userServicesActions.toggleDefineServiceDialog());
  }

  onChangeServiceName = (e) => {
    this.setState({
      serviceName: e.target.value,
    })
  }

  onChangeServiceInfo = (e) => {
    this.setState({
      serviceInfo: e.target.value,
    })
  }

  onChangeServiceUrl = (e) => {
    this.setState({
      serviceUrl: e.target.value,
    })
  }

  render() {
    const { userServices } = this.props;
    return (
      <Fragment>
        {userServices.showDefineServiceDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="500px" direction="column">
              <Stepper steps={[
                { title: 'Define your service' },
                { title: 'Service interface' },
                { title: 'Submit' }
              ]} activeStep={1}
              />

              <TextInput placeholder="Service name" size="small"
                onChange={this.onChangeServiceName} />
              <TextInput placeholder="What does this service do ?" size="small"
                onChange={this.onChangeServiceInfo} />
              <TextInput placeholder="Service 's URL e.g. https://myservice.com/api/" size="small"
                onChange={this.onChangeServiceUrl} />

              <Box direction="row" justify="end" align="center" gap="small">
                <Button label="Close" onClick={this.onColseDialog} />
              </Box>

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
