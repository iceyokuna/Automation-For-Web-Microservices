import React, { Component } from 'react'
import { global } from 'style'
import { connect } from 'react-redux'
import { workflowActions } from 'actions'

import { Box, Button, Heading, TextInput, FormField, TextArea } from 'grommet'
import { Next } from 'grommet-icons'

class AddFlowInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workflowName: 'Untitled',
      description: 'empty',
      selectedCollaborators: [],
      userIds: ["iceyo#1177", "pym#887", "bas#998"],
    };
  }

  onChangeWorkflowName = (e) => {
    this.setState({ workflowName: e.target.value });
  }
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  onChangecollaborators = (chips) => {
    this.setState({
      selectedCollaborators: chips,
    })
  }

  onNextStep = () => {
    const { workflowName, description, } = this.state;
    const { dispatch } = this.props;
    // dispatch(workflowActions.createNewWorkflow(workflowName, description, "CREATE_NEW"));
    dispatch(workflowActions.setMode("CREATE_NEW"));
    dispatch(workflowActions.prepareNewWorkflow(workflowName, description));
  }

  render() {
    const { workflowName, description, } = this.state
    return (
      <div style={{
        ...global.mainContainer,
        maxWidth: null,
      }}>
        <Box flex direction="column" align="center" justify="center"
          fill='vertical'>
          <Box pad='medium' width="400px" animation='fadeIn'
            round={{ size: 'small' }}
            background="light-0" >
            <Heading size="small"  >
              Create a new flow
          </Heading>
            <FormField >
              <TextInput
                id="input_workflow_name"

                ref='workflowNameInput'
                autoFocus
                placeholder="Workflow Name"
                value={workflowName}
                onChange={this.onChangeWorkflowName} />
            </FormField>
            <FormField>
              <TextArea
                id="input_workflow_description"
                placeholder="Description"
                value={description}
                onChange={this.onChangeDescription} />
            </FormField>
            <Box margin={{ top: 'small' }}>
              < Button  id="confirm_creation"color="accent-1" primary icon={<Next />} label="Next" onClick={this.onNextStep} />
            </Box>

          </Box>
        </Box>

      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow,
  }
}


export default connect(mapStateToProps)(AddFlowInfo);
