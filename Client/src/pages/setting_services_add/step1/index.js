
import React, { Component } from 'react';
import {
  TextInput, Box, Button,
  FormField,
} from 'grommet';
import { userServicesActions } from 'actions';
import { connect } from 'react-redux';

import Spinner from 'react-spinkit';
import { colors } from 'theme';

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

  componentWillReceiveProps(nextProps) {
    const { createNewService } = nextProps.userServices;
    if (createNewService === "success") {
      this.props.onNextStep();
    }
  }

  renderNextButton = () => {
    const { userServices } = this.props;
    const { createNewService } = userServices;
    if (createNewService === "loading") {
      return (
        <Box align="center" pad='small'>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>
      );
    } else {
      return (
        <Box direction="row" justify="end" align="center" gap="small">
          <Button label="Next" color="accent-1" primary onClick={this.onNextStep} />
        </Box>);
    }
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
        {this.renderNextButton()}

      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userServices: state.userServices,
  }
}

export default connect(mapStateToProps)(index);
