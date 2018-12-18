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
import TaskItem from 'components/taskItem'

import moment from 'moment'

export default class FlowDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newAppName: '',
      newDescription: '',
      openEditMenu: undefined,
      description: 'Application for helping reserve meeting date of my company \
      ..................................................................',
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

  onSelectFlow = () => {

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
    const { history, match } = this.props;
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
    const { description } = this.state;
    return (
      <Box fill margin={{ bottom: 'small' }} >
        <Box elevation="medium" margin="small" pad="small" background="light-0" >
          <Box border={{ side: 'bottom', size: 'xsmall' }} pad="xsmall">
            <Text size="large" weight="bold">Description</Text>
          </Box>
          <Box pad="small">
            <Paragraph >{description}</Paragraph>
          </Box>
        </Box>
      </Box>
    );
  }

  renderCollaboratorsBox = () => {
    return (
      <Box fill margin={{ bottom: 'small' }} >
        <Box elevation="medium" margin="small" pad="small" background="light-0" >
          <Box border={{ side: 'bottom', size: 'xsmall' }} pad="xsmall">
            <Text size="large" weight="bold">Collaborators</Text>
          </Box>
          <Box pad="small">
            {/* List of collaborators*/}
            {this.renderCollaboratorsList()}

          </Box>
        </Box>
      </Box>
    )
  }

  renderTaskBox = () => {
    return (
      <Box fill margin={{ bottom: 'small' }} >
        <Box elevation="medium" margin="small" pad="small" background="light-0" >
          <Box border={{ side: 'bottom', size: 'xsmall' }} pad="xsmall">
            <Text size="large" weight="bold">Tasks</Text>
          </Box>
          <Box pad="small">
            {/* List of Tasks*/}
            {this.renderTaskList()}

          </Box>
        </Box>
      </Box>
    )
  }

  renderEditInformationDialog = () => {
    return (
      <Box pad="small" width="400px">
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
          <Button label="Edit Diagram" icon={<Cluster />} color="brand" onClick={this.navigateToModeler} />
          <Button label="OK" icon={<Checkmark />} color="brand" primary onClick={() => { }} />
        </Box>
      </Box>
    )
  }



  render() {
    const { openEditMenu } = this.state;
    const { match } = this.props;
    const flowTitle = match.params.flow_id;

    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Box direction="row" fill align="center" justify="between">
            <Heading size='small' margin={{ right: 'medium' }}>{flowTitle}</Heading>
            <DropButton
              dropAlign={{ top: "bottom", right: "right" }}
              open={openEditMenu}
              onClose={() => this.setState({ openEditMenu: undefined })}
              dropContent={
                this.renderEditInformationDialog()
              }
            >
              <Button label="Edit Info" icon={<Edit />} color="secondary" primary />
            </DropButton>

          </Box>
        </Box>

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
      </div>
    )
  }
}
