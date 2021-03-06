
import React, { Component, Fragment } from 'react';
import {
  TextInput, Box, Button, FormField,
  Select, TextArea,
} from 'grommet';

import { Sort, Add } from 'grommet-icons'
import { Row, Col } from 'react-flexbox-grid';

import { MethodContainer, BadgeIcon } from './style';
import { Spring, Transition, config } from 'react-spring'
import { methods } from './mockup'

const requestTypeOptions = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const interfacePlaceholder = `{
  "date": {
    "type": "string",
    "elementType": "input"
  }
}`;

export default class index extends Component {

  state = {
    numberOfNewMethods: 0,
    resetBadgeAnim: false,
    showMethodList: false,
    methodName: '',
    methodInfo: '',
    methodUrl: '',
    methodType: '',
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
      methodType: option,
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
    this.setState({
      showMethodList: true
    })
  }

  onAddMethod = () => {
    this.setState({
      numberOfNewMethods: this.state.numberOfNewMethods += 1,
      resetBadgeAnim: true,
    });
  }

  onSelectMethod = (method) => {

  }

  onAddmoreMethod = () => {
    this.setState({
      showMethodList: false,
    })
  }


  renderMethodList = () => {
    return (
      <Fragment>
        <table>
          <tr>
            <th>Method name</th>
            <th>URL's endpoint</th>
            <th>Request type</th>
          </tr>
          {methods.map((item, index) =>
            <tr className="service" onClick={() => this.onSelectMethod(item)}>
              <td>{item.methodName}</td>
              <td>{item.methodUrl}</td>
              <td>{item.methodType}</td>
            </tr>
          )}
        </table>
        <Box direction="row" justify="end" gap="small">
          <Button icon={<Add />} label="Add more" color="accent-1"
            onClick={this.onAddmoreMethod} />
          <Button label="Next" color="accent-1"
            priamry onClick={this.onNextStep} />

        </Box>
      </Fragment>
    );
  }


  renderCreateMethod = () => {
    const { methodName, methodInfo, methodUrl,
      methodType, inputInterface, outputInterface,
      numberOfNewMethods, resetBadgeAnim } = this.state
    return (
      <Fragment>
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
                id="methodType"
                name="methodType"
                placeholder="GET"
                value={methodType}
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

        <Box direction="row" justify="between" align="center" gap="small" margin={{ top: 'small' }}>
          <MethodContainer>
            <Button icon={<Sort />} label="Methods" color="accent-1" onClick={this.onListMethods} />

            <Spring
              from={{ opacity: 0, transform: "scale(0.5)" }}
              to={{ opacity: 1, transform: "scale(1.4)" }}
              reset={resetBadgeAnim}
              onRest={() => this.setState({ resetBadgeAnim: false })}
            >
              {props => <BadgeIcon style={props}>{numberOfNewMethods}</BadgeIcon>}
            </Spring>

          </MethodContainer>
          <Box direction="row" gap="small">
            <Button icon={<Add />} label="Method" color="accent-1" onClick={this.onAddMethod} />
            <Button label="Next" color="accent-1" primary onClick={this.onNextStep} />
          </Box>
        </Box>
      </Fragment>
    );
  }



  render() {
    const { showMethodList } = this.state
    return (
      <Box gap="small" pad="medium">
        <Transition
          items={showMethodList}
          from={{ opacity: 0 }}
          enter={{ opacity: 1, }}
          leave={{ opacity: 0, display: 'none' }}>
          {toggle =>
            toggle
              ? props =>
                <div style={props}>
                  {this.renderMethodList()}
                </div>
              : props =>
                <div style={props}>
                  {this.renderCreateMethod()}
                </div>
          }
        </Transition>
      </Box>
    )
  }
}
