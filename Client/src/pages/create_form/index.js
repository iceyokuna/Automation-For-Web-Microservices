import React, { Component } from 'react'

import { workflowActions } from 'actions';
import GrapesContainer from 'containers/GrapeJS';
import FloatDropDown from 'components/float_dropdown'

export default class CreateForm extends Component {

  constructor(props) {
    super(props);
    const currentTask = JSON.parse(localStorage.getItem('currentTask'));

    console.log({ currentTask });
    this.state = {
      currentTask: currentTask,
      elementsIdSet: {}
    }
  }

  handleGeneratedForm = (form) => {
    const { currentTask } = this.state;
    const formType = currentTask.formType === "inputFormNoService"
      || currentTask.formType === "inputForm" ? "inputForm" : "outputForm";

    const action = workflowActions.addNewForm(formType, form, currentTask.taskId);
    localStorage.setItem('newFormAdded', JSON.stringify(action));
    window.close(); // Close curent tab
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
        <FloatDropDown
          formType={currentTask.formType}
          taskId={currentTask.taskId}
          service={currentTask.selectedService}
          elementsIdSet={elementsIdSet} />
        <GrapesContainer
          formType={currentTask.formType}
          initialForm={currentTask.currentForm}
          taskId={currentTask.taskId}
          onExportForm={this.handleGeneratedForm}
          elementsIdSet={elementsIdSet}
          service={currentTask.selectedService}
          onSetElementId={this.handleSetElementId} />
      </div>
    )
  }
}


