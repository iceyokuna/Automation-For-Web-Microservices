import React, { Component, } from 'react'
import { Box, Button, Text } from 'grommet';
import { Add, Close } from 'grommet-icons'

import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { colors } from 'theme';
import { userServicesActions } from 'actions'

class index extends Component {

  state = {
    loadingServices: true,
    currentContent: "services",
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadingServices: false });
    }, 2000);

    this.props.dispatch(userServicesActions.getUserServices());
  }

  onAddService = () => {
    const { match, history } = this.props;
    history.push(match.url + '/addService');
    // this.props.dispatch(userServicesActions.toggleDefineServiceDialog());3
  }

  onSelectService = (index, serviceId) => {
    const { match, dispatch, history } = this.props;
    dispatch(userServicesActions.setCurrentService(index, serviceId));
    history.push(match.url + '/info');
  }

  onDeleteUserService = (service, itemIndex) => {
    const { dispatch } = this.props;
    dispatch(userServicesActions.deleteServiceById(service.id, itemIndex));
  }

  renderServices = () => {
    if (this.state.loadingServices) return (
      <Box align="center" justify="center" pad="medium">
        <Spinner
          fadeIn="half"
          name="ball-scale-multiple" color={colors.brand} />
      </Box>
    );

    const { userServices } = this.props;
    if (userServices.data.length == 0) {
      return (
        <Box align="center" justify="center" pad="medium" gap="medium">
          <Text size="medium">You don't have any service</Text>
          <Box direction="row" justify="end" align="center">
            <Button label="Add service" color="accent-1"
              icon={<Add />}
              primary onClick={this.onAddService} />
          </Box>
        </Box>
      )
    }
    return (
      <Box animation={["fadeIn"]}>
        <table>
          <tr>
            <th>Service name</th>
            <th>Service info</th>
          </tr>
          {userServices.data.map((service, index) =>
            <tr className="service" onClick={() => this.onSelectService(index, service.id)}>
              <td>{service.name || "Untitled"}</td>
              <td>
                <Box justify="between" direction="row" align="center">
                  <Text>
                    {service.info || "Undefined"}
                  </Text>
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    this.onDeleteUserService(service)
                  }}
                    icon={<Close size="14px" />} />
                </Box>
              </td>
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