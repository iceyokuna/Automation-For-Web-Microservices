import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Heading, Box, Button,
  Layer,
} from 'grommet'

import { workflowActions } from 'actions';
import { Link } from 'react-router-dom';

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
    this.props.dispatch(workflowActions.toggleFormTypeDialog());
  }

  onUpdateInfo = () => {

  }

  onGotoCreateForm(formType) {
    const { appliedMethods, generatedForms, currentNode } = this.props.workflow;
    const nodeId = currentNode.id;
    const currentFormIndex = generatedForms.findIndex((task) => task.taskId === nodeId);
    const currentTask = {
      formType: formType,
      taskId: nodeId,
      selectedService: appliedMethods[nodeId],
      currentForm: currentFormIndex == -1 ? null : generatedForms[currentFormIndex].formData,
    }
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
    window.open('/home/design_form'); // Open a new tab
  }

  render() {
    const { workflow } = this.props;
    return (
      <Fragment>
        {workflow.showFormTypeDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="300px" direction="column">
              <Heading level={2} margin="none">
                Type of Form
              </Heading>
              <Box gap="small" pad={{ vertical: 'small' }}>
                <Button fill label="Input" color="accent-4" style={{ color: '#fff' }}
                  primary onClick={() => this.onGotoCreateForm('inputForm')} />

                <Button fill label="Output" color="accent-3" primary
                  onClick={() => this.onGotoCreateForm('outputForm')} />
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
})

export default connect(mapStateToProps)(index)
