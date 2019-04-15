import React, { Component } from 'react'

import { Button, Box, Text } from 'grommet';
import { FillParent } from 'style'
import { UniversalStyle as Style } from 'react-css-component'
import { connect } from 'react-redux'
import { workflowActions, socketActions } from 'actions'
import { Next, Previous } from 'grommet-icons'

class ExecuteFlow extends Component {

    state = {
        currentFormHtml: null,
        currentFormCss: null,
    }

    componentDidMount = () => {
        const { dispatch } = this.props
        dispatch(socketActions.nextForm(null, null, null));
    }

    componentWillReceiveProps = (nextProps) => {
        const { executingForm } = nextProps.workflow;
        if (executingForm) {
            this.setState({
                currentFormHtml: executingForm.formHtml,
                currentFormCss: executingForm.formCss,
            })
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
            if (e.checked == true) {
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
        const { dispatch, workflow } = this.props;
        const taskId = workflow.executingTaskId;
        const formInputValues = this.extractValuesFromCurrentForm();
        dispatch(socketActions.nextForm("IC_MEETING", formInputValues, taskId));
    }

    render() {
        const { currentFormCss, currentFormHtml } = this.state;
        const { executingForm } = this.props.workflow;
        if (executingForm === "DONE") return <Box>Done all forms</Box>
        else {
            return (
                <FillParent>
                    <Style css={currentFormCss} />
                    <Box pad="medium" gap="medium">
                        <Text size="large" weight="bold">Workflow Execution</Text>
                        <Box border="bottom">
                            <div id="formContainer" dangerouslySetInnerHTML={{ __html: currentFormHtml }} />
                        </Box>

                        <Box direction="row" align="center" justify="between" gap="medium">
                            <Button style={styles.navButton} icon={<Previous />} label="Previous" onClick={() => this.getPreviousForm()} />
                            <Button style={styles.navButton} icon={<Next />} label="Next" primary onClick={() => this.getNextForm()} />
                        </Box>
                    </Box>
                </FillParent>
            );
        }

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
    }
}


export default connect(mapStateToProps, null)(ExecuteFlow);
