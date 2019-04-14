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
      formType,
      taskId: nodeId,
      selectedService: appliedMethods[nodeId],
      currentForm: currentFormIndex == -1 ? null : generatedForms[currentFormIndex].formData,
    }
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
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

                <Link style={{ width: '100%' }}
                  to={{
                    pathname: '/home/design_form',
                  }} target="_blank" onClick={this.onGotoCreateForm('inputForm')}>
                  <Button fill label="Input" color="accent-4" style={{color: '#fff'}} primary />
                </Link>

                <Link style={{ width: '100%' }}
                  to={{
                    pathname: '/home/design_form',
                  }} target="_blank" onClick={this.onGotoCreateForm('outputForm')}>
                  <Button fill label="Output" color="accent-3" primary />
                </Link>
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
