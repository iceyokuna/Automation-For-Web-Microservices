import React, { Component } from 'react'

import { Button, Box, Text } from 'grommet';
import { FillParent } from 'style'

import { ClientStyle as Style } from 'react-css-component'
// import Style from 'style-it';
import { connect } from 'react-redux'
import { workflowActions, socketActions } from 'actions'
import cssString from './css_string'


class ExecuteFlow extends Component {
    state = {
        currentFormHtml: null,
        currentFormCss: null,
    }

    componentDidMount = () => {
        // const { dispatch } = this.props
        // dispatch(socketActions.startFlow("IC_KMITL"));

        // const mainContainer = document.getElementById('mainContainer');
        // mainContainer.addEventListener('submit', this.onSubmitForm.bind(this));

        // const { executingForm } = this.props.workflow;

        // this.setState({
        //     currentFormHtml: executingForm.formHtml,
        //     currentFormCss: executingForm.formCss
        // })

        // document.getElementById('mainContainer').setAttribute('style', executingForm.formCss)


    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (this.props.workflow.formsDone) {
    //         const { formIds } = this.props.workflow;
    //         Object.keys(formIds).forEach(id => {
    //             const divElement = document.getElementById(id);
    //             if (divElement != null) {
    //                 divElement.innerText = formIds[id];
    //             }
    //         })

    //     }

    // }


    // componentWillReceiveProps = (nextProps) => {
    //     const { currentFormIndex, generatedForms, formsDone } = nextProps.workflow;

    //     if (formsDone) {
    //         const textElements = document.querySelectorAll('div');
    //         console.log(textElements)
    //     }
    //     if (currentFormIndex < generatedForms.length) {
    //         const currentFormData = generatedForms[currentFormIndex].formData;

    //         this.setState({
    //             currentFormHtml: currentFormData.formHtml,
    //             currentFormCss: currentFormData.formCss
    //         })


    //     }

    // }

    onSubmitForm = (event) => {
        event.preventDefault();
        const { firstname, lastname } = event.target.elements;
        const formData = {
            firstname, lastname
        }

        const elements = document.getElementsByTagName('input');

        for (let e of elements) {
            console.log(e.type, e.name, e.value)
            this.props.dispatch(workflowActions.addNameToId(e.name, e.value));
        }

        // this.props.dispatch(workflowActions.getNextForm())

        // event.stopPropagation();
    }

    getNextForm = () => {
        const { dispatch } = this.props
        dispatch(socketActions.nextForm("IC_MEETING"));
    }


    render() {
        if (this.props.workflow == null) {
            return <Box>Loading</Box>
        } else {
            const { executingForm } = this.props.workflow;
            return (
                <FillParent>
                    <Style css={executingForm.formCss} />
                    <Box pad="medium" gap="medium">
                        <Text size="large" weight="bold">Workflow Execution</Text>
                        <Box border="bottom">
                            <div id="mainContainer" ref="mainContainer" dangerouslySetInnerHTML={{ __html: executingForm.formHtml }} />
                        </Box>

                        <Button label="Next" primary onClick={() => this.getNextForm()} />
                    </Box>
                </FillParent>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        workflow: state.workflow,
    }
}


export default connect(mapStateToProps, null)(ExecuteFlow);
