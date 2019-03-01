import React, { Component } from 'react'
import { global } from 'style'

import { Box, Button, Heading, Text, TextInput, FormField, TextArea } from 'grommet'
import { FormNext } from 'grommet-icons'

import { connect } from 'react-redux'

import { workflowActions } from 'actions'

class AddFlowInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workflowName: '',
      description: '',
    };
  }

  onChangeWorkflowName = (e) => {
    this.setState({ workflowName: e.target.value });
  }
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  onNextStep = () => {
    const { workflowName, description } = this.state;
    this.props.dispatch(workflowActions.setAppInfo(workflowName, description));
    this.props.history.push('design_workflow');
  }

  render() {
    return (
      <div style={{ ...global.mainContainer, backgroundColor: '#ffffff' }}>
        <Box flex direction="column"
          align="center" justify="center" fill='vertical'>
          <Box pad='medium' width="400px" animation='fadeIn'>
            <Heading size="small" responsive={false} >
              Create a New Flow
          </Heading>
            <FormField >
              <TextInput
                ref='workflowNameInput'
                autoFocus
                placeholder="Workflow Name"
                value={this.state.workflowName}
                onChange={this.onChangeWorkflowName} />
            </FormField>
            <FormField>
              <TextArea
                placeholder="Description"
                value={this.state.description}
                onChange={this.onChangeDescription} />
            </FormField>

            <Box margin={{ top: 'small' }}>
              < Button color="accent-1" primary icon={< FormNext />} label="Next" onClick={this.onNextStep} />
            </Box>

          </Box>
        </Box>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow,
  }
}


export default connect(mapStateToProps)(AddFlowInfo);
