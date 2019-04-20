import React, { Component } from 'react'
import { Box, Button, Text, } from 'grommet';

import "./style.css";
import { services } from './mockup'

import Spinner from 'react-spinkit'
import { colors } from 'theme';

import DefineServiceDialog from 'components/define_service_dialog'
import { connect } from 'react-redux';
import { userServicesActions } from 'actions'

class index extends Component {

  state = {
    loadingServices: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadingServices: false });
    }, 2000);
  }

  onAddService = () => {
    this.props.dispatch(userServicesActions.toggleDefineServiceDialog());
  }

  onSelectService = (index) => {

  }

  renderServices = () => {
    const { loadingServices } = this.state;
    if (loadingServices) return (
      <Box align="center" justify="center">
        <Spinner name="ball-scale-multiple" color={colors.brand} />
      </Box>
    );
    else return (
      <table>
        <tr>
          <th>Service Name</th>
          <th>Service URL</th>
        </tr>
        {services.map((item, index) =>
          <tr className="service" onClick={() => this.onSelectService(index)}>
            <td>{item.serviceName}</td>
            <td>{item.serviceUrl}</td>
          </tr>
        )}
      </table>

    )
  }

  render() {
    const { userServices } = this.props;
    return (
      <Box pad={{ vertical: 'small' }}>
        <DefineServiceDialog />

        <Box direction="row" justify="end" align="center">
          <Button label="Add Service" color="accent-1" primary onClick={this.onAddService} />
        </Box>

        {this.renderServices()}


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