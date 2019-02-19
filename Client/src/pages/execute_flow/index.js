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

    constructor(props) {
        super(props);

        this.formContainerRef = React.createRef();
    }

    componentDidMount = () => {
        const { dispatch } = this.props
        dispatch(socketActions.startFlow("IC_KMITL"));
    }

    componentWillReceiveProps = (nextProps) => {
        const { executingForm } = nextProps.workflow;

        if (executingForm) {
            this.setState({
                currentFormHtml: executingForm.formHtml,
                currentFormCss: executingForm.formCss,
            })
        }
        // const { currentFormIndex, generatedForms, formsDone } = nextProps.workflow;

        // if (formsDone) {
        //     const textElements = document.querySelectorAll('div');
        //     console.log(textElements)
        // }
        // if (currentFormIndex < generatedForms.length) {
        //     const currentFormData = generatedForms[currentFormIndex].formData;

        //     this.setState({
        //         currentFormHtml: currentFormData.formHtml,
        //         currentFormCss: currentFormData.formCss
        //     })
        // }

    }

    getPreviousForm = () => {
        console.log("Get Previous Form");
    }

    extractValuesFromCurrentForm = () => {
        const inputElements = document.getElementsByTagName('input');
        const inputValues = {};
        for (let e of inputElements) {
            inputValues[e.id] = {
                type: e.type,
                name: e.name,
                value: e.value
            }
        }
        return inputValues;
    }

    getNextForm = () => {
        const { dispatch } = this.props;
        const formInputValues = this.extractValuesFromCurrentForm();
        console.log(formInputValues);
        dispatch(socketActions.nextForm("IC_MEETING", formInputValues));
    }


    render() {
        const { currentFormCss, currentFormHtml } = this.state;
        if (!currentFormCss || !currentFormHtml) return <Box>Loading</Box>
        else {
            return (
                <FillParent>
                    <Style css={currentFormCss} />
                    <Box pad="medium" gap="medium">
                        <Text size="large" weight="bold">Workflow Execution</Text>
                        <Box border="bottom">
                            <div id="formContainer" ref={this.formContainerRef} dangerouslySetInnerHTML={{ __html: currentFormHtml }} />
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
