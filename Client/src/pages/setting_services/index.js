import React, { Component, Fragment } from 'react'
import { Box, Button, Text, } from 'grommet';
import { AddCircle } from 'grommet-icons'

import { services } from './mockup'

import Spinner from 'react-spinkit'
import { colors } from 'theme';

import DefineServiceDialog from 'components/define_service_dialog';


import { connect } from 'react-redux';
import { userServicesActions } from 'actions';
import { Route, Link } from 'react-router-dom';

class index extends Component {

  state = {
    loadingServices: true,
    currentContent: "services",
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadingServices: false });
    }, 2000);
  }

  onAddService = () => {
    const { match } = this.props;
    this.props.history.push(match.url + '/addService');
    // this.props.dispatch(userServicesActions.toggleDefineServiceDialog());
  }

  onSelectService = (index) => {
    this.setState({
      currentContent: "serviceDetail",
    })
  }

  renderServices = () => {
    return (
      <Box animation={["fadeIn"]}>
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

        <Box direction="row" justify="end" align="center">
          <Button label="Add Service" color="accent-1"
            icon={<AddCircle />}
            primary onClick={this.onAddService} />

        </Box>
      </Box>
    );
  }

  renderServiceDetail = () => {
    return (
      <Box animation={["fadeIn"]}>
        Service detail
      </Box>
    );
  }

  renderMethods = () => {
    return (
      <Box animation={["fadeIn"]}>
        Methods
      </Box>
    );
  }

  renderMethodDetail = () => {
    return (
      <Box animation={["fadeIn"]}>
        Method detail
      </Box>
    );
  }

  renderContents = () => {
    const { loadingServices, currentContent } = this.state;
    if (loadingServices) {
      return (
        <Box align="center" justify="center">
          <Spinner name="ball-scale-multiple" color={colors.brand} />
        </Box>
      );
    } else if (currentContent == "services") {
      return this.renderServices();
    } else if (currentContent === "serviceDetail") {
      return this.renderServiceDetail();
    } else if (currentContent === "methods") {
      return this.renderMethods();
    } else if (currentContent === "methodDetail") {
      return this.renderMethodDetail();
    }
  }

  render() {
    const { userServices, match } = this.props;
    return (
      <Box pad={{ vertical: 'small' }}>
        <DefineServiceDialog />
        {this.renderServices()}
        {/* {this.renderContents()} */}

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