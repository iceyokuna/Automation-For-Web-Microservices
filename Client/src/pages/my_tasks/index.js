import React, { Component } from 'react'

import {
  Box,
  Heading, Text
} from 'grommet';

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

    return inboxTasks.data.map((item, index) =>
      <TaskItemInbox workflowName={item.workflowName}
        key={index} delay={index}
        isEven={index % 2 === 0}
        actionType={item.actionType}
        actionDescription={item.actionDescription}
        createdAt={moment(item.createdAt).format('lll')}
        onClick={this.onClickTask}
        onApprove={() => this.onApproveTask(item)}
        onReject={() => this.onRejectTask(item)} />);
  }


  render() {
    const { inboxTasks } = this.props;
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Row>
            <Col lg={8} sm={8} xs={12}>
              <Box direction="row" align="center">
                <Heading size='small' margin={{ right: 'medium' }}>My tasks</Heading>
              </Box>
            </Col>
          </Row>
        </Box>

        {inboxTasks.isLoading === true ? (<Box justify="center" align="center" pad={{ top: "medium" }}>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple"
            color={colors.brand} />
        </Box>) : (
            <Box direction="column" gap="small" animation="fadeIn"
              pad={{ top: "small", bottom: 'medium', left: 'medium', right: 'medium' }}
              margin={{ bottom: 'large' }}>

              <Box background="light-0" pad="small">
                <Box direction="row" align="center" gap="xsmall" margin={{ horizontal: 'medium', }}>
                  <Box style={{ flex: 3 }} pad={{ vertical: 'small' }}
                    border={{ side: 'bottom', color: 'accent-1', size: 'small' }}>
                    <Text textAlign="center" weight="bold">Workflow</Text>
                  </Box>
                  <Box style={{ flex: 6 }} pad={{ vertical: 'small' }}
                    border={{ side: 'bottom', color: 'accent-2', size: 'small' }}>
                    <Text textAlign="center" weight="bold" >Action</Text>
                  </Box>
                  <Box style={{ flex: 2 }} pad={{ vertical: 'small' }}
                    border={{ side: 'bottom', color: 'accent-3', size: 'small' }}>
                    <Text textAlign="center" weight="bold">Date</Text>
                  </Box>
                </Box>
                {this.renderTasks()}
              </Box>

            </Box>)}
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