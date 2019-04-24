import React, { Component, Fragment } from 'react'
import { Box, Button, Text, } from 'grommet';
import { AddCircle } from 'grommet-icons'

import { services } from './mockup'
import { connect } from 'react-redux';

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

  render() {
    const { userServices, match } = this.props;
    return (
      <Box pad={{ vertical: 'small' }}>
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