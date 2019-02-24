import React, { Component } from 'react'

import { Button } from 'grommet';

import { workflowActions } from 'actions';
import { TaskPanel } from './style'

import GrapesContainer from 'containers/GrapeJS';
import FloatDropDown from 'components/float_dropdown'


export default class CreateForm extends Component {

  constructor(props) {
    super(props);

    const currentTask = JSON.parse(localStorage.getItem('currentTask'));
    this.state = {
      currentTask: currentTask,
    }
  }

  handleGeneratedForm(form) {
    const { currentTask } = this.state;
    const action = workflowActions.addNewForm(form, currentTask.taskId);
    localStorage.setItem('newFormAdded', JSON.stringify(action));

    // Delay 1 sec
    setTimeout(() => {
      window.close(); // Close curent tab
    }, 1000);
  }

  render() {
    const { currentTask } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <FloatDropDown taskId={currentTask.taskId} service={currentTask.selectedService} />
        {/* <TaskPanel >{this.state.currentTaskId}</TaskPanel> */}
        <GrapesContainer onExportForm={(form) => { this.handleGeneratedForm(form) }} />
      </div>
    )
  }
}


