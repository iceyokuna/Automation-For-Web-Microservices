
import React, { Component } from 'react';
import {
  TextInput, Box, Button, FormField,
  Select, TextArea,
} from 'grommet';

import { Row, Col } from 'react-flexbox-grid';
import { Scrollbars } from 'react-custom-scrollbars'

const requestTypeOptions = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const interfacePlaceholder = `{
  "date": {
    "type": "string",
    "elementType": "input"
  }
}`;

export default class index extends Component {

  state = {
    methodName: '',
    methodInfo: '',
    methodUrl: '',
    requestType: '',
    inputInterface: '',
    outputInterface: '',
  }

  onChangeMethodName = (e) => {
    this.setState({
      methodName: e.target.value,
    })
  }

  onChangeMethodInfo = (e) => {
    this.setState({
      methodInfo: e.target.value,
    })
  }

  onChangeMethodUrl = (e) => {
    this.setState({
      methodUrl: e.target.value,
    })
  }

  onChangeRequestType = ({ option }) => {
    this.setState({
      requestType: option,
    })
  }

  onChangeInputInterfaceType = (e) => {
    this.setState({
      inputInterface: e.target.value,
    })
  }

  onChangeOutputInterfaceType = (e) => {
    this.setState({
      outputInterface: e.target.value,
    })
  }


  onNextStep = () => {
    this.props.onNextStep();
  }

  onListMethods = () => {

  }

  render() {
    const { methodName, methodInfo, methodUrl, requestType, inputInterface, outputInterface } = this.state
    return (
      <Box gap="small" pad="medium">
        <Row >
          <Col xs={12} md={5} lg={5}>
            <FormField>
              <TextInput placeholder="Method name" size="small"
                onChange={this.onChangeMethodName} value={methodName} />
            </FormField>
          </Col>
          <Col xs={12} md={7} ld={7}>
            <FormField>
              <TextInput placeholder="What does this method do ?" size="small"
                onChange={this.onChangeMethodInfo} value={methodInfo} />
            </FormField>
          </Col>

          <Col xs={12} md={8} lg={8}>
            <FormField>
              <TextInput placeholder="URL's path e.g. /news/techologies" size="small"
                onChange={this.onChangeMethodUrl} value={methodUrl} />
            </FormField>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormField>
              <Select
                id="requestType"
                name="requestType"
                placeholder="GET"
                value={requestType}
                options={requestTypeOptions}
                onChange={this.onChangeRequestType}
              />
            </FormField>
          </Col>
        </Row>

        <Row style={{ height: 200 }}>
          <Col xs={12} md={6} lg={6}>
            <TextArea fill
              value={inputInterface} placeholder={interfacePlaceholder}
              onChange={this.onChangeInputInterfaceType} />
          </Col>

          <Col xs={12} md={6} lg={6}>
            <TextArea fill
              value={outputInterface} placeholder={interfacePlaceholder}
              onChange={this.onChangeOutputInterfaceType} />
          </Col>
        </Row>

        <Box direction="row" justify="between" align="center" gap="small">
          <Button label="List of methods" color="accent-1" onClick={this.onListMethods} />
          <Box direction="row" gap="small">
            <Button label="Add more" color="accent-1" onClick={this.onNextStep} />
            <Button label="Next" color="accent-1" primary onClick={this.onNextStep} />
          </Box>
        </Box>
      </Box>
    )
  }
}
