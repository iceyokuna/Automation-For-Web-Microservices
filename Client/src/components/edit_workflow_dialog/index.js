import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Heading, Box, Button,
  Layer, TextInput, FormField,
  TextArea
} from 'grommet'

import { workflowActions } from 'actions';

export class index extends Component {

  constructor(props) {
    super(props);
    const { workflow } = props;
    this.state = {
      name: workflow.name,
      description: workflow.description,
    }
  }

  onColseDialog = () => {
    this.props.dispatch(workflowActions.toggleEditWorkflowDialog());
  }

  onUpdateInfo = () => {
    const { generatedForms, appliedMethods, bpmnJson } = this.props.workflow;
    const { name, description } = this.state;
    const { workflowConditions, workflowPreInputs } = this.props;
    const { appliedConditions } = workflowConditions;
    const { appliedPreInputs } = workflowPreInputs;

    const workflowData = {
      bpmnJson,
      appliedMethods,
      appliedConditions,
      appliedPreInputs,
      generatedForms,
    }
    this.onColseDialog();
    this.props.dispatch(workflowActions.updateWorkflow(
      name,
      description,
      workflowData
    ));
  }

  onChangeAppName = (e) => {
    this.setState({ name: e.target.value });
  }
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  render() {
    const { workflow } = this.props;
    return (
      <Fragment>
        {workflow.showEditInfoDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="500px" direction="column">
              <Heading level={2} margin="none">
                Edit workflow information
              </Heading>
              <Box gap="small">
                <FormField >
                  <TextInput
                    placeholder="Application Name"
                    value={this.state.name}
                    onChange={this.onChangeAppName} />
                </FormField>
                <FormField>
                  <TextArea
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.onChangeDescription} />
                </FormField>
              </Box>

              <Box direction="row" justify="end" align="center" gap="small">
                <Button label="Ok" primary onClick={this.onUpdateInfo} />
                <Button label="Close" onClick={this.onColseDialog} />
              </Box>

            </Box>
          </Layer>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  workflow: state.workflow,
  workflowConditions: state.workflowConditions,
  workflowPreInputs: state.workflowPreInputs,
})

export default connect(mapStateToProps)(index)
