import React, { Component, } from 'react'
import {
  Box, Button, Text,
  Heading,
  Table,
  TableCell,
  TableBody,
  TableHeader,
} from 'grommet';
import { Add, Close } from 'grommet-icons';
import { TableRow } from 'style';

import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { colors } from 'theme';
import { userServicesActions } from 'actions'
import { global } from 'style';

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
    history.push(match.url + '/add_service');
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
      <Box animation={["fadeIn"]} pad="medium"
        background="light-0" round={{ size: "small" }}>

        <Table caption="Services Table">
          <TableHeader>
            <TableRow>
              <TableCell key="1" scope="col" align="left">
                <Text weight="bold">Service name</Text>
              </TableCell>
              <TableCell key="2" scope="col" align="left">
                <Text weight="bold">Service info</Text>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {userServices.data.map((service, index) =>
              <TableRow onClick={() => this.onSelectService(index, service.id)}>
                <TableCell ho>
                  <Text >{service.name || "Untitled"}</Text>
                </TableCell>
                <TableCell>
                  <Box justify="between" direction="row" align="center" fill>
                    <Text>
                      {service.info || "Undefined"}
                    </Text>
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      this.onDeleteUserService(service, index)
                    }}
                      icon={<Close size="14px" />} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </Box>
    );
  }

  render() {
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Box direction="row" align="center" justify="between" margin={{ bottom: 'small' }}>
            <Heading size='small' margin={{ right: 'medium' }}>My services</Heading>
            <Button label="Service" color="accent-1"
              icon={<Add />} primary onClick={this.onAddService} />
          </Box>
          {this.renderServices()}
        </Box>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userServices: state.userServices,
  }
}

export default connect(mapStateToProps)(index);