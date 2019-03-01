import React, { Component } from 'react'

import { workflowActions } from 'actions';
import GrapesContainer from 'containers/GrapeJS';
import FloatDropDown from 'components/float_dropdown'

export default class CreateForm extends Component {

  constructor(props) {
    super(props);

    const currentTask = JSON.parse(localStorage.getItem('currentTask'));

    this.state = {
      currentTask: currentTask,
      elementsIdSet: {}
    }
    console.log(currentTask);
  }

  handleGeneratedForm = (form) => {
    const { currentTask } = this.state;
    const action = workflowActions.addNewForm(form, currentTask.taskId);
    localStorage.setItem('newFormAdded', JSON.stringify(action));

    // Delay 1 sec
    setTimeout(() => {
      window.close(); // Close curent tab
    }, 1000);
  }

  handleSetElementId = (elementId, isIdSet) => {
    const { elementsIdSet } = this.state;
    elementsIdSet[elementId] = isIdSet;
    this.setState({
      elementsIdSet: elementsIdSet,
    })
  }

  componentWillUnmount = () => {
    localStorage.removeItem(this.state.currentTask);
  }

  render() {
    const { currentTask, elementsIdSet } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <FloatDropDown taskId={currentTask.taskId} service={currentTask.selectedService} elementsIdSet={elementsIdSet} />
        <GrapesContainer
          onExportForm={this.handleGeneratedForm}
          onSetElementId={this.handleSetElementId} />
      </div>
    )
  }
}


