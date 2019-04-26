
import React, { Component } from 'react';
import {
  TextInput, Box, Button,
  FormField,
} from 'grommet';
import { userServicesActions } from 'actions';
import { connect } from 'react-redux';

class index extends Component {
  state = {
    serviceName: '',
    serviceInfo: '',
    serviceUrl: '',
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

  onNextStep = () => {
    // this.props.onNextStep();
    const { serviceName, serviceInfo, serviceUrl } = this.state;
    this.props.dispatch(userServicesActions.addNewService(
      serviceName, serviceInfo, serviceUrl));
  }

  render() {
    return (
      <Box gap="small" pad="medium">
        <FormField>
          <TextInput placeholder="Service name" size="small"
            onChange={this.onChangeServiceName} />
        </FormField>
        <FormField>
          <TextInput placeholder="What does this service do ?" size="small"
            onChange={this.onChangeServiceInfo} />
        </FormField>
        <FormField>
          <TextInput placeholder="Service 's URL e.g. https://myservice.com/api/" size="small"
            onChange={this.onChangeServiceUrl} />
        </FormField>
        <Box direction="row" justify="end" align="center" gap="small">
          <Button label="Next" color="accent-1" primary onClick={this.onNextStep} />
        </Box>
      </Box>
    )
  }
}

export default connect()(index);
