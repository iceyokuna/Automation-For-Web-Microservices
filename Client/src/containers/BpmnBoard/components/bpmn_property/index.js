import React, { Component } from 'react';
import { local } from './style';

import { Box, TextInput, Button, Heading, Text, FormField } from 'grommet';
import { FormAdd, Checkmark, Close } from 'grommet-icons';
import { global } from 'style';
import { Link, Redirect } from 'react-router-dom'


export default class BpmnProperty extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nodeId: '',
      nodeName: '',
      nodeType: null,
      toCreateForm: false
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
    localStorage.setItem('currentTaskId', this.state.nodeId);
  }

  renderSpecialProperties() {
    const { nodeType } = this.state;
    let elements = null;

    if (nodeType === 'bpmn:Task') {
      elements = (
        <Box margin={{ bottom: 'small' }}>
          <FormField>
            <TextInput size="small" placeholder="Api url" />
          </FormField>
          <Box align="center" margin={{ top: 'small' }}>
            <Link style={{ width: '100%' }} to={{
              pathname: 'design_form',
              state: {
                forTaskId: true
              }
            }} target="_blank" onClick={() => this.onGotoCreateForm()}>
              <Button icon={<FormAdd />} fill label="Create Form" />
            </Link>
          </Box>
        </Box>
      );
    }
    return elements;
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
      <Box style={local.container} elevation='medium' pad='medium' background={'light-0'}>
        <Text size='large' style={local.propertiesText} weight="bold">Properties</Text>
        <FormField>
          <TextInput size="small" placeholder="ID" value={nodeId} onChange={this.onChangeID} />
        </FormField>
        <FormField>
          <TextInput size="small" placeholder="Name" value={nodeName} onChange={this.onChangeName} />
        </FormField>
        {this.renderSpecialProperties()}
        {this.renderConfirmChange()}

      </Box>
    )
  }
}
