import React, { Component } from 'react';
import { local } from './style';

import { Box, TextInput, Button, Heading, Text, FormField } from 'grommet';
import { FormAdd, Checkmark, Close } from 'grommet-icons';
import { global } from 'style';
import { Link, Redirect } from 'react-router-dom'

import ServiceList from 'components/service_list'

import PropTypes from 'prop-types'

const serviceMethods = [
  {
    methodName: 'Send email to a receiver', requirement: {
      "input": {
        "emailTitle": {
          "type": "string",
          "formData": {
            "elementType": "TextInput",
            "elementId": "title#1"
          }
        },
        "emailBody": {
          "type": "string",
          "formData": {
            "elementType": "TextArea",
            "elementId": "message#233"
          }
        },
        "receiver": {
          "type": "string",
          "formData": {
            "elementType": "TextInput",
            "elementId": "receiver#1123"
          }
        }
      },
      "output": {
        "emailObject": {
          "type": "json"
        }
      }
    }
  },
  {
    methodName: 'Send email to multiple users', requirement: {
      "input": {
        "emailTitle": {
          "type": "string",
          "formData": {
            "elementType": "TextInput",
            "elementId": "title#1"
          }
        },
        "emailBody": {
          "type": "string",
          "formData": {
            "elementType": "TextArea",
            "elementId": "message#233"
          }
        },
        "receiver": {
          "type": "string",
          "formData": {
            "elementType": "TextInput",
            "elementId": "receiver#1123"
          }
        }
      },
      "output": {
        "emailObject": {
          "type": "json"
        }
      }
    }
  },
]

const services = [
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Email Service', description: 'This is description of the service', methods: serviceMethods },
  { serviceTitle: 'Payment Service', description: 'This is description of the service', methods: serviceMethods },
]

class BpmnProperty extends Component {

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
          <Box margin={{ bottom: 'small' }}>
            <Box align="center" margin={{ top: 'small' }}>
              <Link style={{ width: '100%' }} to={{
                pathname: 'design_form',
                state: {
                  forTaskId: true
                }
              }} target="_blank" onClick={() => this.onGotoCreateForm()}>
                <Button icon={<FormAdd />} fill label="Create Form" />
              </Link>

              <Box pad={{ vertical: 'medium' }}>
                <ServiceList services={services} onSelectServiceMethod={(serviceMethod) => this.props.onSelectServiceMethod(serviceMethod)} />
              </Box>

            </Box>
          </Box>)
      }

      default:
        break;
    }
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
      <Box style={local.container} elevation='medium' pad='medium' background={'light-0'} responsive={false}>
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

BpmnProperty.propTypes = {
  allServices: PropTypes.array.isRequired
}

export default BpmnProperty