import React, { Component } from 'react'

import { Button, Box, Text } from 'grommet';
import { FillParent } from 'style'

import { ClientStyle as Style } from 'react-css-component'
// import Style from 'style-it';
import { connect } from 'react-redux'
import { bpmnActions } from 'actions'
import cssString from './css_string'


class ExecuteFlow extends Component {
    state = {
        currentFormHtml: null,
        currentFormCss: null,
    }

    componentDidMount = () => {
        const mainContainer = document.getElementById('mainContainer');
        mainContainer.addEventListener('submit', this.onSubmitForm.bind(this));

        const { currentFormIndex, generatedForms } = this.props.bpmn;

        const forms = generatedForms[currentFormIndex] || null;
        if (forms != null) {
            const formData = forms.formData;
            this.setState({
                currentFormHtml: formData.formHtml,
                currentFormCss: formData.formCss
            })

            document.getElementById('mainContainer').setAttribute('style', formData.formCss)
        }


    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.bpmn.formsDone) {
            const { formIds } = this.props.bpmn;

            Object.keys(formIds).forEach(id => {
                const divElement = document.getElementById(id);
                divElement.innerText = formIds[id];
            })

        }

    }


    componentWillReceiveProps = (nextProps) => {
        const { currentFormIndex, generatedForms, formsDone } = nextProps.bpmn;

        if (formsDone) {
            const textElements = document.querySelectorAll('div');
            console.log(textElements)
        }
        if (currentFormIndex < generatedForms.length) {
            const currentFormData = generatedForms[currentFormIndex].formData;

            this.setState({
                currentFormHtml: currentFormData.formHtml,
                currentFormCss: currentFormData.formCss
            })


        }

    }

    onSubmitForm = (event) => {

        event.preventDefault();
        const { firstname, lastname } = event.target.elements;
        const formData = {
            firstname, lastname
        }

        const elements = document.getElementsByTagName('input');

        for (let e of elements) {
            console.log(e.type, e.name, e.value)
            this.props.dispatch(bpmnActions.addNameToId(e.name, e.value));
        }

        this.props.dispatch(bpmnActions.getNextForm())

        // event.stopPropagation();
    }

    render() {
        const { currentFormHtml } = this.state

        return (
            <FillParent>
                <Style css={cssString} />
                <Box pad="medium" gap="medium">
                    <Text size="large" weight="bold">Workflow Execution</Text>
                    <Box border="bottom">
                        <div id="mainContainer" ref="mainContainer" dangerouslySetInnerHTML={{ __html: currentFormHtml }} />
                    </Box>
                </Box>

            </FillParent>

        )
    }
}

const mapStateToProps = (state) => {
    const { bpmn } = state;
    return {
        bpmn,
    };
};



export default connect(mapStateToProps, null)(ExecuteFlow);
