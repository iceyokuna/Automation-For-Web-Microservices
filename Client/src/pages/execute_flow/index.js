import React, { Component } from 'react'

import { Button, Box, Text } from 'grommet';
import { FillParent } from 'style'

import { ClientStyle as Style } from 'react-css-component'
// import Style from 'style-it';
import { connect } from 'react-redux'
import { bpmnActions } from 'actions'


const htmlInput = `<form action="/test" method="post">
First name: <input id="firstName" type="text" name="firstname"><br>
Last name: <input id="lastname" type="text" name="lastname"><br>
<input id="submitButton" type="submit" value="Submit">
</form>`

const css = `* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
button{
  width:100%;
  margin:15px 0;
  background-color:#009688;
  border:none;
  color:#f6f6f6;
  border-radius:2px;
  padding:7px 10px;
  font-size:1em;
  cursor:pointer;
}
form{
  border-radius:3px;
  padding:10px 15px;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);
  color:#444444;
}
textarea{
  width:100%;
  margin-bottom:15px;
  padding:7px 10px;
  border-radius:2px;
  color:#444444;
  background-color:#eeeeee;
  border:none;
}
input{
  width:100%;
  margin-bottom:15px;
  padding:7px 10px;
  border-radius:2px;
  color:#444444;
  background-color:#eee;
  border:none;
}
label{
  width:100%;
  display:block;
}
`

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

    componentWillReceiveProps = (nextProps) => {
        const { currentFormIndex, generatedForms } = nextProps.bpmn;
        const currentFormData = generatedForms[currentFormIndex].formData;

        this.setState({
            currentFormHtml: currentFormData.formHtml,
            currentFormCss: currentFormData.formCss
        })

    }

    onSubmitForm = (event) => {

        event.preventDefault();
        const { firstname, lastname } = event.target.elements;
        const formData = {
            firstname, lastname
        }

        const elements = document.getElementsByTagName('input');

        for (let e of elements) {
            console.log(e.value)
        }

        this.props.dispatch(bpmnActions.getNextForm())

        // event.stopPropagation();
    }

    render() {
        const { currentFormHtml } = this.state

        const { currentFormIndex, generatedForms } = this.props.bpmn;
        const forms = generatedForms[currentFormIndex];
        const formHtml = forms.formHtml;
        const formData = forms.formData;

        return (
            <FillParent>
                <Style css={formData.formCss} />
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
