import React, { Component } from 'react'

import {
  Box, Button,
  Heading, Text
} from 'grommet';

import { Add } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import TaskItemInbox from 'components/task_item_inbox';

import axios from 'axios';

import moment from 'moment'

export default class MyTasks extends Component {

  state = {
    myTasks: [],
  }

  componentDidMount = () => {
    axios.get('https://5c8f65998447f30014cb826b.mockapi.io/api/endUserTasks').
      then(res => {
        this.setState({
          myTasks: res.data
        })
      }).catch(err => {
        console.error(err);
      })
  }

  onApproveTask = (item) => {

  }

  onRejectTask = (item) => {

  }

  renderTasks = () => {
    const { myTasks } = this.state;

    return myTasks.map((item, index) =>
      <TaskItemInbox workflowName={item.workflowName}
        isEven={index % 2 == 0}
        actionType={item.actionType}
        actionDescription={item.actionDescription}
        createdAt={moment(item.createdAt).format('lll')}
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

            <Col lg={4} sm={4} xs={12}>
              <Box direction="row" align="center" fill justify="end">
                <Button label="New Flow" primary icon={<Add />} color="accent-1" onClick={() => this.onCreateFlow()} />
              </Box>
            </Col>
          </Row>
        </Box>

        <Box direction="column" gap="small">
          <Box direction="row" align="center">
            <Box style={{ flex: 2 }}>
              <Text textAlign="center" weight="bold">Workflow</Text>
            </Box>
            <Box style={{ flex: 6 }}>
              <Text textAlign="center" weight="bold">Action</Text>
            </Box>
            <Box style={{ flex: 3 }}>
              <Text textAlign="center" weight="bold">Date</Text>
            </Box>
          </Box>
          {this.renderTasks()}
        </Box>

      </div>
    )
  }
}
