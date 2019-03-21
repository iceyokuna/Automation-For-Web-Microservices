import React, { Component } from 'react'

import {
  Box, Button,
  Heading, Text
} from 'grommet';

import { Add } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import TaskItemInbox from 'components/task_item_inbox';

import moment from 'moment'

import { connect } from 'react-redux'

import { inboxTasksActions } from 'actions'
import Spinner from 'react-spinkit'

import { colors } from 'theme';

class MyTasks extends Component {

  state = {
    myTasks: [],
  }

  componentDidMount = () => {
    this.props.dispatch(inboxTasksActions.getAllInboxTasks());
  }

  onApproveTask = (item) => {

  }

  onRejectTask = (item) => {

  }


  onClickTask = () => {
    const { match, history } = this.props;

    history.push(match.url + "/task#2232");
  }



  renderTasks = () => {
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
    return inboxTasks.data.map((item, index) =>
      <TaskItemInbox workflowName={item.workflowName}
        isEven={index % 2 == 0}
        actionType={item.actionType}
        actionDescription={item.actionDescription}
        createdAt={moment(item.createdAt).format('lll')}
        onClick={this.onClickTask}
        onApprove={() => this.onApproveTask(item)}
        onReject={() => this.onRejectTask(item)} />);
  }


  render() {
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Row>
            <Col lg={8} sm={8} xs={12}>
              <Box direction="row" align="center">
                <Heading size='small' margin={{ right: 'medium' }}>My Tasks</Heading>
              </Box>
            </Col>
          </Row>
        </Box>

        <Box direction="column" gap="small">
          <Box direction="row" align="center" margin={{ horizontal: 'medium' }}>
            <Box style={{ flex: 3 }}>
              <Text textAlign="center" weight="bold">Workflow</Text>
            </Box>
            <Box style={{ flex: 6 }}>
              <Text textAlign="center" weight="bold" >Action</Text>
            </Box>
            <Box style={{ flex: 3 }}>
              <Text textAlign="center" weight="bold">Date</Text>
            </Box>
          </Box>

          <Box pad={{ bottom: 'large' }} gap="xsmall">
            {this.renderTasks()}
          </Box>
        </Box>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inboxTasks: state.inboxTasks,
  }
}

export default connect(mapStateToProps)(MyTasks);