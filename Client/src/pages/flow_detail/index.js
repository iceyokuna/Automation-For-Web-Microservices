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
import Spinner from 'react-spinkit';
import { colors } from 'theme';
import { Redirect } from 'react-router-dom';

class FlowDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newname: '',
      newDescription: '',
      openEditMenu: undefined,
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
      this.props.history.push('/home/my_flows');
    }
  }

  renderCollaboratorItems = () => {
    const { workflowCollaborators } = this.props;
    const { collaborators, loadingCollaborators } = workflowCollaborators;
    if (loadingCollaborators == true) {
      return (
        <Box align="center" pad='small'>
          <Spinner
            fadeIn="quarter"
            name="line-scale" color={colors.brand} />
        </Box>
      );
    } if (collaborators.length == 0) {
      return (
        <Box>
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
        <Box pad="small" fill="horizontal">
          {/* List of collaborators*/}
          {this.renderCollaboratorItems()}
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
    const { openEditMenu } = this.state;
    const { currentFlow } = this.props;
    if (currentFlow == null) {
      return <Redirect to="/home/my_flows" />;
    }
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
    workflowCollaborators: state.workflowCollaborators,
    workflow: state.workflow,
  }
}

export default connect(mapStateToProps)(FlowDetail);