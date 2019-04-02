import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
  Paragraph,
  Text,
  DropButton,
  TextInput,
  TextArea,
  FormField
} from 'grommet';

import { Edit, Checkmark, FormUp, Cluster } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import CollaboratorItem from 'components/collaborator_item'
import TaskItem from 'components/task_item'

import moment from 'moment';
import { connect } from 'react-redux';
import { workflowActions } from 'actions';

class FlowDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newAppName: '',
      newDescription: '',
      openEditMenu: undefined,
      collaborators: [
        { name: 'Phat Thaveepholcharoen', type: 'Admin' },
        { name: 'Iceyo Kuna', type: 'Manager' },
        { name: 'Treesakul', type: 'User' },
        { name: 'User#14', type: 'User' },
        { name: 'User#77', type: 'User' },
        { name: 'User#77', type: 'User' },
        { name: 'User#77', type: 'User' },
        { name: 'User#77', type: 'User' },
        { name: 'User#77', type: 'User' },
      ],
      tasks: [
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
      ]
    }
  }

  onChangeAppName = (e) => {
    this.setState({ newAppName: e.target.value });
  }
  onChangeDescription = (e) => {
    this.setState({ newDescription: e.target.value });
  }

  onCloseEditMenu = () => {
    this.setState({
      openEditMenu: false,
    });

    setTimeout(() => this.setState({
      openEditMenu: undefined,
    }), 1);
  }

  navigateToModeler = () => {
    const { history, match, currentFlow, dispatch } = this.props;

    dispatch(workflowActions.setWorkflowId(currentFlow.id));
    history.push(match.url + '/edit_diagram');
  }

  renderCollaboratorsList = () => {
    const { collaborators } = this.state;
    const views = collaborators.map((item, index) =>
      <CollaboratorItem key={index} name={item.name} type={item.type} />)
    return views;
  }

  renderTaskList = () => {
    const { tasks } = this.state
    const views = tasks.map((item, index) =>
      <TaskItem key={index} {...item} onSelectTask={() => alert('Click a task')} />)
    return views;
  }

  renderDescriptionBox = () => {
    const { currentFlow } = this.props;
    return (
      <Box margin="small" pad="small"
        round={{ size: 'small' }} background="light-0" >
        <Box border={{ side: 'bottom', size: 'xsmall' }} pad="xsmall">
          <Text size="large" weight="bold">Description</Text>
        </Box>
        <Box pad="small">
          <Paragraph >{currentFlow.description}</Paragraph>
        </Box>
      </Box>
    );
  }

  renderCollaboratorsBox = () => {
    return (
      <Box margin="small" pad="small"
        round={{ size: 'small' }} background="light-0" >
        <Box border={{ side: 'bottom', size: 'xsmall' }} pad="xsmall">
          <Text size="large" weight="bold">Collaborators</Text>
        </Box>
        <Box pad="small">
          {/* List of collaborators*/}
          {this.renderCollaboratorsList()}

        </Box>
      </Box>
    )
  }

  renderTaskBox = () => {
    return (
      <Box margin="small" pad="small"
        round={{ size: 'small' }}
        background="light-0" >
        <Box border={{ side: 'bottom', size: 'xsmall' }} pad="xsmall">
          <Text size="large" weight="bold">Tasks</Text>
        </Box>
        <Box pad="small">
          {/* List of Tasks*/}
          {this.renderTaskList()}

        </Box>
      </Box>
    )
  }

  renderEditInformationDialog = () => {
    return (
      <Box pad="small" width="400px" round={{ size: 'small' }}>
        <Box direction="row" justify="between" align="center">
          <Heading level={3} margin="small">
            Edit Information
                    </Heading>
          <Button icon={<FormUp />} onClick={this.onCloseEditMenu} />
        </Box>

        <FormField >
          <TextInput
            placeholder="Application Name"
            value={this.state.newAppName}
            onChange={this.onChangeAppName} />
        </FormField>
        <FormField>
          <TextArea
            placeholder="Description"
            value={this.state.newDescription}
            onChange={this.onChangeDescription} />
        </FormField>

        <Box direction="row" justify="end" gap="small">
          <Button label="Edit Diagram" icon={<Cluster />} color="accent-1" onClick={this.navigateToModeler} />
          <Button label="OK" icon={<Checkmark />} color="accent-1" primary onClick={() => { }} />
        </Box>
      </Box>
    )
  }

  render() {
    const { openEditMenu } = this.state;
    const { currentFlow } = this.props;
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Box direction="row" fill align="center" justify="between">
            <Heading size='small' margin={{ right: 'medium' }}>{currentFlow.name}</Heading>
            <DropButton
              dropAlign={{ top: "bottom", right: "right" }}
              open={openEditMenu}
              onClose={() => this.setState({ openEditMenu: undefined })}
              dropContent={
                this.renderEditInformationDialog()
              }
            >
              <Button label="Edit Info" icon={<Edit />} color="accent-1" primary />
            </DropButton>

          </Box>
        </Box>

        <Box margin={{ bottom: 'large' }}>
          <Row >
            <Col lg={6} md={6} xl={6}>
              <Box direction="column">
                {this.renderDescriptionBox()}
                {this.renderCollaboratorsBox()}
              </Box>
            </Col>
            <Col lg={6} md={6} xl={6}>
              {this.renderTaskBox()}
            </Col>
          </Row>
        </Box>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentFlow: state.workflowMyFlows.currentFlow,
  }
}

export default connect(mapStateToProps)(FlowDetail);