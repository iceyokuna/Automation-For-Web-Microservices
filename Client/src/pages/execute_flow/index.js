import React, { Component } from 'react'

import { Button, Box, Text } from 'grommet';
import { CaretUp, } from 'grommet-icons';
import { FillParent } from 'style'
import { UniversalStyle as Style } from 'react-css-component'
import { connect } from 'react-redux'
import { socketActions, workflowActions, monitorActions, } from 'actions'
import Modal from 'components/modal';
import DockContainer from 'components/execution_log';
import { OpenDock } from 'style';
import MonitorDiagram from 'components/monitor_diagram';
import Spinner from 'react-spinkit';
import { colors } from 'theme';

class ExecuteFlow extends Component {

  constructor(props) {
    super(props);
    const { dispatch, authentication, currentWorkflowId } = props;
    const user = authentication.user;
    dispatch(socketActions.openSocket(null, null, null, user, currentWorkflowId));

    this.state = {
      currentFormHtml: null,
      currentFormCss: null,
      currentFormJs: null,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { executingForm } = nextProps.workflow;
    if (executingForm) {
      this.setState({
        currentFormHtml: executingForm.formHtml,
        currentFormCss: executingForm.formCss,
        currentFormJs: executingForm.formJs,
      });

      const script = document.createElement("script");
      const scriptText = document.createTextNode(executingForm.formJs);
      script.appendChild(scriptText);
      document.body.appendChild(script);

    }
    // if (executingForm === "FAIL") {
    //     this.setState({
    //         currentFormHtml: "<div>FAIL</div>",
    //         currentFormCss: "",
    //         currentFormJs: "",
    //     });
    // }
  }

  getPreviousForm = () => {
    console.log("Get Previous Form");
  }

  extractValuesFromCurrentForm = () => {
    const inputElements = document.getElementById('formContainer').getElementsByTagName('input');
    const textareaElements = document.getElementById('formContainer').getElementsByTagName('textarea');
    const elements = [...inputElements, ...textareaElements];
    const inputValues = {};

    for (let e of elements) {
      // Check whether the checkbox input is selected or not
      if (e.checked === true) {
        inputValues[e.id] = {
          type: e.type,
          name: e.name,
          value: e.value,
          checked: true,
        }
      } else {
        inputValues[e.id] = {
          type: e.type,
          name: e.name,
          value: e.value
        }
      }
    }
    return inputValues;
  }

  getNextForm = () => {
    const { dispatch, workflow, authentication, currentWorkflowId } = this.props;
    const user = authentication.user
    const taskId = workflow.executingTaskId;
    const formInputValues = this.extractValuesFromCurrentForm();
    dispatch(socketActions.nextForm(
      "IC_MEETING", formInputValues,
      taskId, user, currentWorkflowId
    ));
  }

  onAcceptWaitingStatus = () => {
    const { dispatch, history, } = this.props;
    dispatch(workflowActions.closeWaitingDialog());
    window.close();
  }

  onOpenLogs = () => {
    this.props.dispatch(monitorActions.toggleDock());
  }

  renderLoadingFormModal = () => {
    const { socket } = this.props;
    const { loadingExecutionForm } = socket;
    return (
      <Modal show={loadingExecutionForm} width="300px">
        <Box align="center" direction="row"
          pad='small' gap="large" justify="center">
          <Text>Loading next form ...</Text>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>
      </Modal>
    );
  }

  render() {
    const { currentFormCss, currentFormHtml, } = this.state;
    const { dispatch, workflow, history, } = this.props;
    const { showWaitingDialog, waitingMessage } = workflow;

    return (
      <FillParent>

        {this.renderLoadingFormModal()}

        <OpenDock icon={<CaretUp color="#fff" />}
          color="accent-4" primary plain={false}
          data-tip="Workflow logs"
          onClick={this.onOpenLogs} />

        <DockContainer >
          <MonitorDiagram height="350px" />
        </DockContainer>

        <Modal show={showWaitingDialog} header="Execution status"
          onCloseModal={() => dispatch(workflowActions.closeWaitingDialog())}>
          <Box gap="small">
            <Text>{waitingMessage}</Text>
            <Button alignSelf="end" label="Go back"
              primary onClick={this.onAcceptWaitingStatus} />
          </Box>
        </Modal>
        <Style css={currentFormCss} />
        <Box pad="medium" gap="medium">
          <Text size="large" weight="bold">Workflow Execution</Text>
          <Box border="bottom">
            <div id="formContainer"
              dangerouslySetInnerHTML={{ __html: currentFormHtml }} />
          </Box>
          <Box direction="row" align="center" justify="end" gap="small">
            <Button style={styles.navButton} label="Previous" onClick={() => this.getPreviousForm()} />
            <Button style={styles.navButton} label="Next" primary onClick={() => this.getNextForm()} />
          </Box>
        </Box>
      </FillParent>
    );
  }
}

const styles = {
  navButton: {
    width: 120
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow,
    authentication: state.authentication,
    currentWorkflowId: state.workflowMyFlows.currentFlow.id,
    socket: state.socket,
  }
}


export default connect(mapStateToProps, null)(ExecuteFlow);
