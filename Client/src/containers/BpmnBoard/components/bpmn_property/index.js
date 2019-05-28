import React, { Component } from 'react';
import { local } from './style';

import { Box, TextInput, Button, Text, FormField, } from 'grommet';
import {
  Checkmark,
  Close, Stakeholder,
  Alarm, Edit,
} from 'grommet-icons';

import TaskProperty from './task_property'
import GatewayProperty from './gateway_property'

import { connect } from 'react-redux'
import { workflowActions } from 'actions';

import { services } from './mockup_service_data'

class BpmnProperty extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nodeId: '',
      nodeName: '',
      nodeType: null,
      eventType: null,
      isAsyncTask: false,
      toCreateForm: false,
    }

  }

  onChangeID = (e) => {
    this.setState({
      nodeId: e.target.value
    })
  }

  onChangeName = (e) => {
    this.setState({
      nodeName: e.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    const { currentElement } = nextProps;
    if (currentElement) {
      this.setState({
        nodeId: currentElement.id,
        nodeName: currentElement.name || '',
        nodeType: currentElement.$type,
        eventType: currentElement.eventDefinitions != null
          && currentElement.eventDefinitions.length > 0
          ? currentElement.eventDefinitions[0].$type : null,
      });
    }
  }

  undoAllChanges() {

  }

  onSubmitChanges() {
    if (this.state.nodeType === null) return;
    this.props.onUpdate({ ...this.state });
  }

  onCreateForm() {
    this.setState({
      toCreateForm: true
    });
  }

  onSelectFormType = () => {
    const { dispatch } = this.props;
    dispatch(workflowActions.toggleFormTypeDialog());
  }

  onSetTimer = () => {
    this.props.dispatch(workflowActions.toggleTimerDialog());
  }

  onDefineInput = () => {
    this.props.dispatch(workflowActions.togglePreInputDialog());
  }

  renderSpecialProperties() {
    const { nodeType, eventType } = this.state;
    const { allServices, onSelectServiceMethod,
      onShowConditions, onAssignTask } = this.props;
    const services = allServices.length === 0 ? services : allServices;

    let element = null;

    // console.log(
    //   "%c" + nodeType + " %c" + eventType,
    //   "color: red; font-weight: bold;",
    //   "color: blue; font-weight: bold;");

    switch (nodeType) {
      case 'bpmn:Task': {
        const { workflow } = this.props;
        if (workflow.currentNode == null) return null;
        const elementId = workflow.currentNode.id;
        const disabled = workflow.appliedMethods[elementId] != null ? false : true;
        element = [
          <TaskProperty
            key={1}
            onSelectServiceMethod={(serviceMethod) => onSelectServiceMethod(serviceMethod)}
            services={services}
          />,
          <Button label="Define input" disabled={disabled}
            icon={<Edit />} onClick={this.onDefineInput} key={2} />,
          <Button disabled={disabled} label="Create form"
            onClick={() => this.onSelectFormType()} />
        ]
      } break;

      case "bpmn:Lane": {
        element = <Button label="Assign Task" icon={<Stakeholder />} onClick={onAssignTask} />
      } break;

      case "bpmn:ExclusiveGateway": {
        element = <GatewayProperty onShowConditions={onShowConditions} />
      } break;

      case "bpmn:IntermediateCatchEvent": {
        if (eventType === "bpmn:TimerEventDefinition") {
          element = <Button label="Set timer" icon={<Alarm />} onClick={this.onSetTimer} />
        }
      } break;

      case "bpmn:StartEvent": {
        if (eventType === "bpmn:TimerEventDefinition") {
          element = <Button label="Set timer" icon={<Alarm />} onClick={this.onSetTimer} />
        }
      } break;

      default:
        break;
    }

    return element;
  }

  renderConfirmChange() {
    return (
      <Box direction="row" gap="xsmall" >
        <Button style={{ width: "100%" }} label='OK' primary icon={<Checkmark />} onClick={this.onSubmitChanges.bind(this)} />
        <Button style={{ width: "100%" }} label='Cancel' icon={<Close />} onCancel={() => this.undoAllChanges()} />
      </Box>
    );
  }

  render() {
    const { nodeId, nodeName } = this.state;

    return (
      <Box style={local.container} elevation="small" round={{ corner: "top-left", size: "xsmall" }}
        pad='medium' background='light-0' gap="small" >
        <Text size='large' style={local.propertiesText} weight="bold">Properties</Text>
        <FormField>
          <TextInput size="small" placeholder="ID" value={nodeId} onChange={this.onChangeID} />
        </FormField>
        <FormField>
          <TextInput size="small" placeholder="Name" value={nodeName} onChange={this.onChangeName} />
        </FormField>

        {this.renderSpecialProperties()}
        {/* {this.renderConfirmChange()} */}

      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow,
    workflowPreInputs: state.workflowPreInputs,
  }
}



export default connect(mapStateToProps)(BpmnProperty);