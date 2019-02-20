import React, { Component } from 'react'

import { Box, Text, Button } from 'grommet';
import { Group, Sort, Performance, Checkmark, Close } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'
import { Container } from './style'

const sideBarWidth = 200;
const appBarHeight = 60;

const iconColor = "#ffffff";



const InterfaceItem = ({ item, parameterName, isDone }) => {
  return (
    <Box pad="xsmall" border={{ side: 'bottom', size: 'small' }} flex={false}>

      <Box direction="row" justify="between">
        <Box>
          <Box direction="row" gap="small">
            <Text weight="bold">Parameter name : </Text>
            <Text >{parameterName}</Text>
          </Box>
          <Box direction="row" gap="small">
            <Text weight="bold">Element type : </Text>
            <Text >{item.formData.elementType}</Text>
          </Box>
          <Box direction="row" gap="small">
            <Text weight="bold">Element id : </Text>
            <Text >{item.formData.elementId} </Text>
          </Box>
        </Box>
        <Box justify="center">
          {isDone == true ? <Checkmark color="#5FEB89" /> :
            <Close color="#FF6161" />}
        </Box>
      </Box>

    </Box>
  )
}

export default class FloatDropdown extends Component {
  state = {
    show: true,
    currentMethod: {
      methodName: "Registration",
      taskId: 'Task_161fsp2',
      input_interface: {
        emailTitle: {
          type: "string",
          formData: {
            elementType: "input",
            elementId: "title#1"
          }
        },
        emailBody: {
          type: "string",
          formData: {
            elementType: "textarea",
            elementId: "message#233"
          }
        },
        receiver: {
          type: "string",
          formData: {
            elementType: "input",
            elementId: "receiver#1123"
          }
        }
      },
    }
  }

  toggleMenu = (params) => {
    this.setState({ show: !this.state.show });
  }

  appendItem = (params) => {
    const currentMethod = this.state.currentMethod;

    currentMethod.input_interface["A" + Math.floor(Math.random() * 100)] = {
      type: "string",
      formData: {
        elementType: "input",
        elementId: "receiver#1123"
      }
    }

    this.setState({
      currentMethod: currentMethod
    })

  }


  renderInterfaceItem = () => {
    const { input_interface } = this.state.currentMethod;
    return Object.keys(input_interface).
      map((key, index) =>
        <InterfaceItem
          item={input_interface[key]}
          parameterName={key}
          key={index} />)
  }


  render() {
    const { show, currentMethod } = this.state;

    return (
      <Container >
        <Transition
          items={show}
          from={{ width: 0, opacity: 0 }}
          enter={{ width: sideBarWidth, opacity: 1 }}
          leave={{ width: 0, opacity: 0 }}
          config={config.wobbly}>
          {toggle =>
            toggle
              ? props =>

                <Box background="light-0" width="400px"
                  elevation="medium" pad="medium" gap="small"
                >
                  <Box direction="row" justify="between" border={{ side: 'bottom', size: 'small' }} pad="xsmall">
                    <Text size="xlarge" weight="bold" >{currentMethod.methodName}</Text>
                    <Text size="large" >{currentMethod.taskId}</Text>
                  </Box>

                  <Box style={{ height: 250, overflowY: 'auto' }} >
                    {this.renderInterfaceItem()}
                  </Box>
                  <Button label="ADD" onClick={() => this.appendItem()} />
                </Box>
              : null
          }
        </Transition>
      </Container>
    );
  }
}

const style = { position: 'fixed', left: 0, top: 0, zIndex: 15 }