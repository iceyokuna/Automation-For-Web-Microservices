import React, { Component } from 'react'

import { Button, Box, Text, Paragraph, } from 'grommet';
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
import { GoogleLogin } from 'react-google-login';
import $ from 'jquery';

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
      showInspection: false,
      showAuthCode: false,
      googleAuthCode: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { executingForm, serviceProvider, } = nextProps.workflow;
    if (executingForm) {
      this.setState({
        currentFormHtml: executingForm.formHtml,
        currentFormCss: executingForm.formCss,
        currentFormJs: executingForm.formJs,
        serviceProvider: serviceProvider,
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

  componentDidUpdate(prevProps, prevState) {
    const { workflowMonitor, } = this.props;
    const { formInputValues } = workflowMonitor;
    this.assignValuesToInputForm(formInputValues);
  }


  assignValuesToInputForm = (formInputValues) => {
    if (formInputValues == null) return;
    // console.log({ formInputValues });
    Object.keys(formInputValues).forEach((id, index) => {
      console.log({ id });
      $(`#${id}`).val(formInputValues[id].value).css({ color: colors["accent-4"] });
    })
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

  onClickElement = (elementId) => {
    this.setState({
      showInspection: true,
      elementToInspect: elementId
    });

    const { dispatch, currentFlow } = this.props;
    dispatch(monitorActions.getInputForm(currentFlow.id, elementId));
  }

  onAcceptWaitingStatus = () => {
    const { dispatch, history, } = this.props;
    dispatch(workflowActions.closeWaitingDialog());
    window.close();
  }

  onOpenLogs = () => {
    this.props.dispatch(monitorActions.toggleDock());
  }

  onCloseInspection = () => {
    this.setState({ showInspection: !this.state.showInspection });
  }

  OnResponseGoogleSignin = (response) => {
    this.setState({
      googleAuthCode: response.code,
      showAuthCode: true,
    })
  }

  renderLoadingFormModal = () => {
    const { socket } = this.props;
    const { loadingExecutionForm } = socket;
    return (
      <Modal show={loadingExecutionForm} width="300px" onCloseModal={() => { }}>
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

  renderGoogleSigninButton = () => {
    if (this.state.serviceProvider === "Google" || true) {
      return (
        <GoogleLogin
          clientId="807661190255-ufo59eru56rqc5nj953vv1iu67v5h8pb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.OnResponseGoogleSignin}
          onFailure={this.OnResponseGoogleSignin}
          cookiePolicy={'single_host_origin'}
          scope={"https://www.googleapis.com/auth/drive.file"}
          redirectUri="localhost:3000/execute"
          responseType="code"
          prompt="consent"
        />
      );
    }
  }

  renderElementInspection = () => {
    const { showInspection, elementToInspect } = this.state;
    const { currentFlow, workflowMonitor, } = this.props;
    const { loadingInputForm } = workflowMonitor;
    const { formInputValues } = workflowMonitor;

    if (!showInspection || currentFlow.generatedForms.length == 0) return null;

    const currentForm = currentFlow.generatedForms.find(
      item => item.taskId === elementToInspect
    )

    // Element doesn't have a form
    if (currentForm == null) return null;
    if (formInputValues == null) return null;

    const { formHtml, formCss, } = currentForm.forms.inputForm;
    return (
      <Modal header="Inspection" show={showInspection}
        onCloseModal={this.onCloseInspection}>
        {loadingInputForm ? (
          <Box align="center" pad='small'
            justify="center" height="50px">
            <Spinner
              fadeIn="half"
              name="ball-scale-multiple" color={colors.brand} />
          </Box>
        ) : (
            <Box animation={{ type: 'fadeIn', duration: 500 }}>
              <Style css={formCss} />
              <Text>* Received inputs</Text>
              <div dangerouslySetInnerHTML={{ __html: formHtml }}
                style={{ pointerEvents: 'none', opacity: 0.7, }} />
            </Box>
          )}
      </Modal>
    );
  }

  onCloseAuthCodeModal = () => {
    this.setState({ showAuthCode: false });
  }

  renderGoogleModalAuthCode = () => {
    const { showAuthCode, googleAuthCode } = this.state;
    return (
      <Modal header="Google auth code"
        show={showAuthCode} onCloseModal={this.onCloseAuthCodeModal}>
        <Box pad="small">
          <Paragraph >{googleAuthCode}</Paragraph>
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
        {this.renderElementInspection()}
        {this.renderLoadingFormModal()}
        {this.renderGoogleModalAuthCode()}
        <OpenDock icon={<CaretUp color="#fff" />}
          color="accent-4" primary plain={false}
          data-tip="Workflow logs"
          onClick={this.onOpenLogs} />

        <DockContainer >
          <MonitorDiagram height="350px" onClickElement={this.onClickElement} />
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
            {this.renderGoogleSigninButton()}
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
    currentFlow: state.workflowMyFlows.currentFlow,
    currentWorkflowId: state.workflowMyFlows.currentFlow.id,
    socket: state.socket,
    workflowMonitor: state.workflowMonitor,
  }
}


export default connect(mapStateToProps, null)(ExecuteFlow);
