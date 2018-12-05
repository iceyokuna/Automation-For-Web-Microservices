import React, { Component } from 'react'

import GrapesContainer from 'containers/GrapeJS';
import { Button } from 'grommet';

import { bpmnActions } from 'actions';
import { TaskPanel } from './style'

export default class CreateForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTaskId: localStorage.getItem('currentTaskId')
    }
  }

  handleGeneratedForm(form) {
    const action = bpmnActions.addNewForm(form, this.state.currentTaskId);
    localStorage.setItem('newFormAdded', JSON.stringify(action));

    // Delay 1 sec
    setTimeout(() => {
      window.close(); // Close curent tab
    }, 1000);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <TaskPanel >{this.state.currentTaskId}</TaskPanel>
        <GrapesContainer onExportForm={(form) => { this.handleGeneratedForm(form) }} />
      </div>
    )
  }
}


