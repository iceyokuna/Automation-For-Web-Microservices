import React, { Component, } from 'react'
import { Box, Button, } from 'grommet';
import { Add } from 'grommet-icons'

import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { colors } from 'theme';

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
    if (this.state.loadingServices) return (
      <Box align="center" justify="center" pad="medium">
        <Spinner
          fadeIn="full"
          name="ball-scale-multiple" color={colors.brand} />
      </Box>
    );
    return (
      <Box animation={["fadeIn"]}>
        <table>
          <tr>
            <th>Service Name</th>
            <th>Service URL</th>
          </tr>
          {this.props.userServices.data.map((item, index) =>
            <tr className="service" onClick={() => this.onSelectService(index)}>
              <td>{item.serviceName}</td>
              <td>{item.serviceUrl}</td>
            </tr>
          )}
        </table>

        <Box direction="row" justify="end" align="center">
          <Button label="Add Service" color="accent-1"
            icon={<Add />}
            primary onClick={this.onAddService} />

        </Box>
      </Box>
    );
  }

  render() {
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