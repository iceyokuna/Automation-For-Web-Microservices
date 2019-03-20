import React, { Component } from 'react'

import {
  Box, Button,
  Heading, Text
} from 'grommet';

import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';


import moment from 'moment'

import { connect } from 'react-redux'

import { inboxTasksActions } from 'actions'
import Spinner from 'react-spinkit'

import { colors } from 'theme';

class InboxTaskDetail extends Component {

  componentDidMount = () => {
    this.props.dispatch(inboxTasksActions.getAllInboxTasks());
  }


  onApproveTask = (item) => {

  }

  onRejectTask = (item) => {

  }

  renderInformation = () => {
    const { inboxTasks } = this.props;

    if (inboxTasks.isLoading) {
      return (
        <Box justify="center" align="center" pad={{ top: "medium" }}>
          <Spinner
            fadeIn="quarter"
            name="line-scale"
            color={colors.brand} />
        </Box>);
    }

    if (inboxTasks.data.length > 0) {

      const { workflowName, fromUsername, createdAt,
        actionType, actionDescription } = inboxTasks.data[0];

      return (
        <Row>

          <Col xs={12} sm={12} lg={5}>
            <Box round={{ size: 'small' }} pad="small"
              gap="small" background="light-0" margin="xsmall">
              <Text weight="bold" size="medium">{workflowName}</Text>
              <Box direction="row" justify="between">
                <Box direction="row">
                  <Text weight="bold">From : </Text>
                  <Text>{fromUsername}</Text>
                </Box>
                <Text>
                  {moment(createdAt).format('LT')}
                </Text>
              </Box>
              <Text weight="bold">{`[${actionType}]`}</Text>
              <Text>{actionDescription}</Text>
            </Box>
          </Col>

          <Col xs={12} sm={12} lg={7}  >
            <Box round={{ size: 'small' }} pad="small"
              margin="xsmall" gap="small" background="light-0">
            </Box>
          </Col>

        </Row>
      );
    }
  }


  render() {
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Box direction="row" align="center">
            <Heading size='small' margin={{ right: 'medium' }}>My Tasks</Heading>
          </Box>
        </Box>
        {this.renderInformation()}
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inboxTasks: state.inboxTasks,
  }
}

export default connect(mapStateToProps)(InboxTaskDetail);