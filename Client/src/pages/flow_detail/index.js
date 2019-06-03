import React, { Component, Fragment } from 'react'

import {
  Box, Button,
  Heading,
  Paragraph,
  Text,
  TextInput,
  TextArea,
  FormField
} from 'grommet';

import {
  Checkmark, Cluster, CirclePlay, Add, Group,
  Refresh,
} from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import CollaboratorItem from 'components/collaborator_item'
import ViewerDock from 'components/bpmn_viewer_dock';
import TaskItem from 'components/task_item';
import MemberDialog from 'components/member_dialog';

import { connect } from 'react-redux';
import { workflowActions, monitorActions, } from 'actions';
import Spinner from 'react-spinkit';
import { colors } from 'theme';
import { Redirect } from 'react-router-dom';
import { CircleButton, RoundButton } from './style';
import ReactTooltip from 'react-tooltip';
import Media from 'react-media';
import MonitorDiagram from 'components/monitor_diagram';
import Scrollbars from 'react-custom-scrollbars';
import Modal from 'components/modal';
import { UniversalStyle as Style } from 'react-css-component';
import $ from 'jquery'

class FlowDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newname: '',
      newDescription: '',
      executeStatus: 'Execute', // To do : Classify "Continue" & "Execute"
      currentTask: null,

      showViewerDock: false,
      showInspection: false,
    };
  }

  componentDidMount() {
    ReactTooltip.rebuild();
  }

  componentWillReceiveProps(nextProps) {
    const { workflowMonitor, } = nextProps;
    const { formInputValues } = workflowMonitor;
    this.assignValuesToInputForm(formInputValues);
  }

  assignValuesToInputForm = (formInputValues) => {
    if (formInputValues == null) return;
    Object.keys(formInputValues).forEach((id, index) => {
      $(`#${id}`).val(formInputValues[id].value);
    })
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
    dispatch(workflowActions.setMode("VIEW_EXISTING"));
    dispatch(workflowActions.setWorkflowId(currentFlow.id));
    history.push(match.url + '/edit_diagram');
  }

  onClickTask = (task) => {
    // this.setState({
    //   showViewerDock: true,
    //   currentTask: task,
    // })
  }

  onCloseDock = () => {
    this.setState({
      showViewerDock: !this.state.showViewerDock
    });
  }

  onExecuteFlow = () => {
    const { dispatch, currentFlow, } = this.props;
    // dispatch(socketActions.openSocket());
    window.open(`/execute_flow/${currentFlow.id}`);
  }

  onResetExecutionState = () => {
    const { dispatch, currentFlow } = this.props;
    // dispatch(workflowActions.resetExecutionState(currentFlow.id));
    const { name, description, id, workflowObject, ...workflowData, } = currentFlow;
    dispatch(workflowActions.resetExecutionState(name, description, workflowData, id));
  }


  onAddCollaborator = () => {
    this.props.dispatch(workflowActions.toggleMemberDialog());
  }

  onInviteMembers = () => {
    this.props.dispatch(workflowActions.toggleMemberDialog());
  }

  onCloseInspection = () => {
    this.setState({ showInspection: !this.state.showInspection });
  }

  onClickElement = (elementId) => {
    this.setState({
      showInspection: true,
      elementToInspect: elementId
    });

    const { dispatch, currentFlow } = this.props;
    dispatch(monitorActions.getInputForm(currentFlow.id, elementId));
  }

  renderCollaboratorItems = () => {
    const { workflowCollaborators } = this.props;
    const { collaborators, loadingCollaborators } = workflowCollaborators;
    if (loadingCollaborators === true) {
      return (
        <Box align="center" pad='small' fill justify="center">
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>
      );
    } if (collaborators.length === 0) {
      return (
        <Box align="center" justify="center" pad="medium" gap="small" fill>
          <Text size="medium">You don't have any collaborator</Text>
          <Button label="Invite" color="accent-1"
            icon={<Add />}
            primary onClick={this.onAddCollaborator} />
        </Box>)
    }

    return collaborators.map((item, index) =>
      <Col key={index}>
        <CollaboratorItem
          userName={item.collaborator__username}
          firstName={item.collaborator__first_name}
          lastName={item.collaborator__last_name} />
      </Col>)
  }

  renderTaskList = () => {
    const { workflowMonitor } = this.props;
    const { executedItems } = workflowMonitor;

    if (executedItems.length == 0) {
      return (
        <Box align="center" justify="center" pad="medium" gap="small" fill>
          <Text size="medium">Don't have any tasks</Text>
        </Box>)
    }

    const views = executedItems.map((item, index) =>
      <TaskItem key={index}
        name={item.elementName}
        executedBy={item.executedBy}
        executedDate={item.executedDate}
        executedTime={item.executedTime}
        onSelectTask={() => this.onClickTask(item)} />)

    return views;
  }

  renderDescriptionBox = () => {
    const { currentFlow } = this.props;
    return (
      <Box margin={{ horizontal: "xsmall", vertical: 'small' }} pad="medium"
        animation={[{ type: "fadeIn" }, { type: "zoomIn", size: "large" }]}
        round={{ size: 'small' }} background="light-0" >
        <Text size="large" weight="bold">Description</Text>
        <Paragraph color="dark-2">{currentFlow.description || "No description"}</Paragraph>
      </Box>
    );
  }

  renderCollaboratorsBox = () => {
    return (
      <Box margin={{ horizontal: "xsmall", vertical: 'small' }} pad="medium"
        animation={[{ type: "fadeIn", delay: 200 }, { type: "zoomIn", size: "large" }]}
        round={{ size: 'small' }} background="light-0" >
        <Text size="large" weight="bold" margin={{ bottom: 'small' }}>Collaborators</Text>
        <Scrollbars style={{ height: 170, }} autoHide>
          {this.renderCollaboratorItems()}
        </Scrollbars>

      </Box>
    )
  }

  renderTaskBox = () => {
    return (
      <Box margin={{ horizontal: "xsmall", vertical: 'small' }} pad="medium"
        animation={[{ type: "fadeIn", delay: 400 }, { type: "zoomIn", size: "large" }]}
        round={{ size: 'small' }}
        background="light-0" >
        <Text size="large" weight="bold" margin={{ bottom: 'small' }}>Tasks</Text>
        <Scrollbars style={{ height: 329, }} autoHide>
          {this.renderTaskList()}
        </Scrollbars>
      </Box>
    );

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
          <Button label="Edit diagram" icon={<Cluster />} color="accent-1" onClick={this.navigateToModeler} />
          <Button label="OK" icon={<Checkmark />} color="accent-1" primary onClick={() => { }} />
        </Box>
      </Box>
    )
  }

  renderMonitoringDiagram = () => {
    return (
      <Box margin={{ horizontal: "xsmall", vertical: 'small' }} pad="medium" gap="medium"
        animation={[{ type: "fadeIn", delay: 200 }, { type: "zoomIn", size: "large" }]}
        round={{ size: 'small' }} background="light-0" >
        <Text size="large" weight="bold">Monitoring</Text>
        <MonitorDiagram height="350px" onClickElement={this.onClickElement} />
      </Box>
    );
  }

  renderButtonGroup = () => {
    return (
      <Box gap="small" direction="row">
        <CircleButton
          color="accent-4"
          primary plain={false}
          data-tip="Collaborators of this workflow"
          icon={<Group color="#fff" size="18px" />}
          onClick={this.onInviteMembers} />
        <CircleButton primary data-tip="Start workflow"
          icon={<CirclePlay size="18px" />} plain={false}
          color="accent-3" onClick={this.onExecuteFlow} />
        <CircleButton primary data-tip="Restart workflow"
          icon={<Refresh size="18px" />} plain={false}
          color="accent-2" onClick={this.onResetExecutionState} />
        <CircleButton data-tip="Edit diagram" primary
          plain={false} icon={<Cluster size="18px" />}
          color="accent-1" onClick={this.navigateToModeler} />
      </Box >
    );
  }

  renderElementInspection = () => {
    const { showInspection, elementToInspect } = this.state;
    const { currentFlow, } = this.props;

    if (!showInspection || currentFlow.generatedForms.length == 0) return null;
    const currentForm = currentFlow.generatedForms.find(
      item => item.taskId === elementToInspect
    )

    // Element doesn't have a form
    if (currentForm == null) return null;

    const { formHtml, formCss, } = currentForm.forms.inputForm;
    return (
      <Modal header="Inspection" show={showInspection}
        onCloseModal={this.onCloseInspection}>
        <Style css={formCss} />
        <Text>* Received inputs</Text>
        <div dangerouslySetInnerHTML={{ __html: formHtml }}
          style={{ pointerEvents: 'none', opacity: 0.7, }} />
      </Modal>
    );
  }


  render() {
    const { currentFlow } = this.props;
    if (currentFlow === null) {
      return <Redirect to="/my_flows" />;
    }

    const { showViewerDock, currentTask, executeStatus } = this.state;
    return (
      <div style={global.mainContainer}>
        <ReactTooltip effect="solid" />
        <ViewerDock visible={showViewerDock} currentTask={currentTask}
          onCloseDock={this.onCloseDock} />
        <MemberDialog />
        {this.renderElementInspection()}

        <Box pad={{ horizontal: 'medium' }}>
          <Box>
            <Row between={3}>
              <Col xs={12} sm={6} md={4} lg={4}>
                <Heading size='small' margin={{ right: 'medium' }} >{currentFlow.name || "Untitled"}</Heading>
              </Col>

              <Col xs={12} sm={6} md={8} lg={8}>
                <Media query="(max-width: 599px)">
                  {matched => matched ? (
                    <Box direction="row"
                      justify="center" align="center" fill>
                      {this.renderButtonGroup()}
                    </Box>
                  ) : (
                      <Box direction="row"
                        justify="end" align="center" fill>
                        {this.renderButtonGroup()}
                      </Box>
                    )}
                </Media>
              </Col>
            </Row>

          </Box>
        </Box>

        <Box margin={{ bottom: 'large' }} pad="small">
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

            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              {this.renderMonitoringDiagram()}
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
    workflowMonitor: state.workflowMonitor,
  }
}

export default connect(mapStateToProps)(FlowDetail);