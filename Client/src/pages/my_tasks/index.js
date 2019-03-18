import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
} from 'grommet';

import { Add } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import TaskItemInbox from 'components/task_item_inbox';

export default class MyTasks extends Component {
  renderTasks = () => {

    return ([<TaskItemInbox />, <TaskItemInbox />]);
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
          {this.renderTasks()}
        </Box>

      </div>
    )
  }
}
