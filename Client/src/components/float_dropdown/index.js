import React, { Component } from 'react'

import { Box, Text, Button } from 'grommet';
import { Checkmark, Help, FormDown } from 'grommet-icons';

import { Transition, config } from 'react-spring'
import PlainButton from 'components/plain_button'
import { Container, CollapseButton, circleButton, CollapseButtonContainer } from './style'

const sideBarWidth = 200;
const appBarHeight = 60;

const iconColor = "#ffffff";

const InterfaceItem = ({ item, parameterName }) => {
  return (
    <Box pad="xsmall" border={{ side: 'bottom', size: 'small' }} flex={false}>

      <Box direction="row" justify="between">
        <Box>
          <Box direction="row" gap="small">
            <Text weight="bold">Parameter name : </Text>
            <Text >{parameterName}</Text>
          </Box>
          <Box direction="row" gap="small">
            <Text weight="bold">Element id : </Text>
            <Text >{parameterName} </Text>
          </Box>
          <Box direction="row" gap="small">
            <Text weight="bold">Element type : </Text>
            <Text >{item.elementType}</Text>
          </Box>
        </Box>
        <Box justify="center">
          {item.isIdSet == true ? <Checkmark color="#5FEB89" /> :
            <Help color="#FF6161" />}
        </Box>
      </Box>

    </Box>
  )
}

export default class FloatDropdown extends Component {
  state = {
    show: false,
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ show: true });
    }, 500);
  }


  toggleMenu = () => {
    this.setState({ show: !this.state.show });
  }

  renderInterfaceItems = (interfaceData) => {
    const { elementsIdSet } = this.props;

    const cloneObject = { ...interfaceData };
    const keys = Object.keys(cloneObject);

    for (let key of keys) {
      // Check that user set id for each element or not
      if (interfaceData[key] && elementsIdSet[key]) {
        cloneObject[key].isIdSet = true;
      } else {
        cloneObject[key].isIdSet = undefined;
      }
    }

    return Object.keys(cloneObject).
      map((key, index) =>
        <InterfaceItem
          item={cloneObject[key]}
          parameterName={key}
          key={index} />)
  }


  render() {
    const { show } = this.state;
    const { taskId, service, formType } = this.props;
    let typeOfForm, interfaceData = null;
    if (formType === "inputForm") {
      typeOfForm = "Input form";
      interfaceData = service.method.input_interface;
    } else {
      typeOfForm = "Output form";
      interfaceData = service.method.output_interface;
    }
    return (
      <Container >
        <CollapseButtonContainer>
          <Button primary icon={<FormDown color="#ffffff" />} style={circleButton}
            onClick={() => this.toggleMenu()} >
          </Button>
        </CollapseButtonContainer>

        <Transition
          config={config.wobbly}
          items={show}
          from={{ height: 0, width: 400, opacity: 0, }}
          enter={{ height: 'auto', opacity: 1 }}
          leave={{ height: 0, opacity: 0 }}>
          {toggle =>
            toggle
              ? props => <Box background="light-0" width="400px"
                elevation="small" pad="medium" gap="xsmall" style={props}
              >
                <Box border={{ side: 'bottom', size: 'small' }} pad="xsmall">
                  <Text color="accent-4" >{typeOfForm}</Text>
                  <Box direction="row" justify="between">
                    <Text size="xlarge" weight="bold" >{service.method.name}</Text>
                    <Text size="large" >{taskId}</Text>
                  </Box>
                  <Box>
                    <Text>{service.method.info}</Text>
                  </Box>
                </Box>

                <Box style={{ height: 250, overflowY: 'auto' }} >
                  {this.renderInterfaceItems(interfaceData)}
                </Box>
              </Box>
              : props => null
          }
        </Transition>
      </Container>
    );
  }
}

const style = { position: 'fixed', left: 0, top: 0, zIndex: 15 }