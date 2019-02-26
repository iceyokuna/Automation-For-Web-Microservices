import React, { Component } from 'react';
import { local } from './style';

import { Box, TextInput, Button, Heading, Text, FormField, CheckBox } from 'grommet';
import { FormAdd, Checkmark, Close } from 'grommet-icons';
import { global } from 'style';
import { Link, Redirect } from 'react-router-dom'

import ServiceList from 'components/service_list'

import PropTypes from 'prop-types'

import { services } from './mockup_service_data'

import { connect } from 'react-redux'


class BpmnProperty extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nodeId: '',
      nodeName: '',
      nodeType: null,
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
        nodeType: currentElement.$type
      });
    }
  }

  undoAllChanges() {

  }

  onSubmitChanges() {
    if (this.state.nodeType == null) return;
    this.props.onUpdate({ ...this.state });
  }

  onCreateForm() {
    this.setState({
      toCreateForm: true
    });
  }

  onGotoCreateForm() {
    const { appliedMethods } = this.props.workflow;
    const { nodeId } = this.state;
    const currentTask = {
      taskId: nodeId,
      selectedService: appliedMethods[nodeId]
    }
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
  }

  renderSpecialProperties() {
    const { nodeType, isAsyncTask } = this.state;
    const { allServices, onSelectServiceMethod } = this.props;
    const services = allServices.length == 0 ? services : allServices;

    switch (nodeType) {
      // case 'bpmn:Task': {
      //   return (
      //     <Box overflow="auto" margin={{ bottom: 'small' }}>
      //       <Box align="center" margin={{ top: 'small' }}>
      //         <Link style={{ width: '100%' }} to={{
      //           pathname: 'design_form',
      //           state: {
      //             forTaskId: true
      //           }
      //         }} target="_blank" onClick={() => this.onGotoCreateForm()}>
      //           <Button icon={<FormAdd />} fill label="Create Form" />
      //         </Link>
      //       </Box>
      //     </Box>)
      // } break;

      case 'bpmn:Task': {
        return (
          <Box gap="small">
            {/* <CheckBox
              toggle
              label="Asynchronous"
              checked={isAsyncTask}
              onChange={event => this.setState({ isAsyncTask: event.target.checked })} /> */}

            <Box fill="horizontal">
              <ServiceList services={services} onSelectServiceMethod={(serviceMethod) => onSelectServiceMethod(serviceMethod)} />
            </Box>

          </Box>
        )
      }

      default:
        break;
    }
  }

  renderCreateFormButton = () => {
    return (
      <Link style={{ width: '100%' }} to={{
        pathname: 'design_form',
        state: {
          forTaskId: true
        }
      }} target="_blank" onClick={() => this.onGotoCreateForm()}>
        <Button icon={<FormAdd />} fill label="Create Form" />
      </Link>
    );
  }


  renderConfirmChange() {
    return (
      <Box direction="row" >
        <Button style={{ width: "100%" }} label='OK' primary icon={<Checkmark />} onClick={this.onSubmitChanges.bind(this)} />
        <Button style={{ width: "100%" }} label='Cancel' icon={<Close />} onCancel={() => this.undoAllChanges()} />
      </Box>
    );
  }

  render() {
    const { nodeId, nodeName } = this.state;

    return (
      <Box style={local.container} elevation='medium' pad='medium' background={'light-0'} gap="small" responsive={false}>
        <Text size='large' style={local.propertiesText} weight="bold">Properties</Text>
        <FormField>
          <TextInput size="small" placeholder="ID" value={nodeId} onChange={this.onChangeID} />
        </FormField>
        <FormField>
          <TextInput size="small" placeholder="Name" value={nodeName} onChange={this.onChangeName} />
        </FormField>

        {this.renderSpecialProperties()}
        {this.renderCreateFormButton()}
        {this.renderConfirmChange()}

      </Box>
    )
  }
}

BpmnProperty.propTypes = {
  allServices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow
  }
}



export default connect(mapStateToProps)(BpmnProperty);