import React, { Component } from 'react'

import { Button, Box, Text } from 'grommet';
import { FillParent } from 'style'
import { UniversalStyle as Style } from 'react-css-component'
import { connect } from 'react-redux'
import { socketActions, } from 'actions'
import { Next, Previous } from 'grommet-icons'
import { toast } from 'react-toastify'

class ExecuteFlow extends Component {

    state = {
        currentFormHtml: null,
        currentFormCss: null,
        currentFormJs: null,
    }

    componentDidMount = () => {
        const { dispatch, authentication, currentWorkflowId } = this.props;
        const user = authentication.user;
        dispatch(socketActions.nextForm(null, null, null, user, currentWorkflowId));
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
        if (executingForm === "DONE") {
            // toast.success("Done all forms");
            // this.props.dispatch(socketActions.closeSocket());
            // this.props.history.push('/my_flows');
        } if (executingForm === "FAIL") {
            this.setState({
                currentFormHtml: "<div>FAIL</div>",
                currentFormCss: "",
                currentFormJs: "",
            });
        }
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

    render() {
        const { currentFormCss, currentFormHtml, } = this.state;
        return (
            <FillParent>
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
    }
}


export default connect(mapStateToProps, null)(ExecuteFlow);
