import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
  Paragraph,
  Text,
  TextInput,
  TextArea,
  FormField
} from 'grommet';

import { Checkmark, Cluster, Play } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import CollaboratorItem from 'components/collaborator_item'
import TaskItem from 'components/task_item'

import moment from 'moment';
import { connect } from 'react-redux';
import { workflowActions } from 'actions';
import Spinner from 'react-spinkit';
import { colors } from 'theme';
import { Redirect } from 'react-router-dom';
import ViewerDock from 'components/bpmn_viewer_dock'

class FlowDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newname: '',
      newDescription: '',
      executeStatus: 'Execute',
      showViewerDock: false,
      currentTask: null,
      tasks: [
        { nodeId: 'Task_0qz6rn4', name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_04hkkce', name: 'EEEEEEEEEE', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_04hkkce', name: 'SSSSSSSS', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_0qz6rn4', name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_0qz6rn4', name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_04hkkce', name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_0qz6rn4', name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
        { nodeId: 'Task_0qz6rn4', name: 'Vote a new meeting date', owner: 'Iceyo Kuna', time: moment().format('llll') },
      ]
    };
  }

  onChangename = (e) => {
    this.setState({ newname: e.target.value });
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

  componentDidMount = () => {
    const { dispatch, currentFlow } = this.props;
    try {
      dispatch(workflowActions.getAllCollaborators(currentFlow.id));
    } catch (e) {
      this.props.history.push('/my_flows');
    }
  }

  onClickTask = (task) => {
    this.setState({
      showViewerDock: true,
      currentTask: task,
    })
  }


  onCloseDock = () => {
    this.setState({
      showViewerDock: !this.state.showViewerDock
    });
  }

  onExecuteFlow = () => {

  }

  renderCollaboratorItems = () => {
    const { workflowCollaborators } = this.props;
    const { collaborators, loadingCollaborators } = workflowCollaborators;
    if (loadingCollaborators === true) {
      return (
        <Box align="center" pad='small'>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>
      );
    } if (collaborators.length === 0) {
      return (
        <Box pad={{ vertical: 'small' }}>
          <Text>You have not invited any collaborator yet.</Text>
        </Box>)
    }

    return collaborators.map((item, index) =>
      <Col >
        <CollaboratorItem key={index}
          userName={item.collaborator__username}
          firstName={item.collaborator__first_name}
          lastName={item.collaborator__last_name} />
      </Col>)
  }

  renderTaskList = () => {
    const { tasks } = this.state
    const views = tasks.map((item, index) =>
      <TaskItem key={index} {...item} onSelectTask={() => this.onClickTask(item)} />)
    return views;
  }

  renderDescriptionBox = () => {
    const { currentFlow } = this.props;
    return (
      <Box margin="small" pad="medium"
        round={{ size: 'small' }} background="light-0" >
        <Text size="large" weight="bold">Description</Text>
        <Paragraph color="dark-2">{currentFlow.description}</Paragraph>
      </Box>
    );
  }

  renderCollaboratorsBox = () => {
    return (
      <Box margin="small" pad="medium"
        round={{ size: 'small' }} background="light-0" >
        <Text size="large" weight="bold">Collaborators</Text>
        {/* List of collaborators*/}
        {this.renderCollaboratorItems()}
      </Box>
    )
  }

  renderTaskBox = () => {
    return (
      <Box margin="small" pad="medium"
        round={{ size: 'small' }}
        background="light-0" >
        <Text size="large" weight="bold">Tasks</Text>
        {/* List of Tasks*/}
        {this.renderTaskList()}
      </Box>
    )
  }

  renderEditInformationDialog = () => {
    return (
      <Box pad="small" width="400px" round={{ size: 'small' }}>
        <Heading level={3} margin="small">
          Edit Information
          </Heading>

        <FormField >
          <TextInput
            placeholder="Application Name"
            value={this.state.newname}
            onChange={this.onChangename} />
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
    const { currentFlow } = this.props;
    if (currentFlow === null) {
      return <Redirect to="/my_flows" />;
    }

    const { showViewerDock, currentTask, executeStatus } = this.state;
    return (
      <div style={global.mainContainer}>
        <ViewerDock visible={showViewerDock} currentTask={currentTask}
          onCloseDock={this.onCloseDock} />
        <Box pad={{ horizontal: 'medium' }}>
          <Box direction="row" fill align="center" justify="between">
            <Heading size='small' margin={{ right: 'medium' }}>{currentFlow.name}</Heading>
            <Box direction="row" gap="small">
              <Button label={executeStatus} primary icon={<Play size="16px" />}
                color="accent-3" onClick={this.onExecuteFlow} />
              <Button label="Edit Diagram" primary icon={<Cluster size="16px" />}
                color="accent-1" onClick={this.navigateToModeler} />
            </Box>

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
    workflowCollaborators: state.workflowCollaborators,
    workflow: state.workflow,
    workflowMyFlows: state.workflowMyFlows,
  }
}

export default connect(mapStateToProps)(FlowDetail);