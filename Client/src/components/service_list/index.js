import React, { Component } from 'react'

import { Box, Text, Accordion, AccordionPanel, TextInput, Button } from 'grommet'
import { FormDown } from 'grommet-icons'
import Avatar from 'react-avatar';
import DropContent from 'components/dropdown_content'
import PlainButton from 'components/plain_button'


export default class index extends Component {

  state = {
    activeIndex: [0],
    selectedServiceMethod: null,
  };

  renderPanelHeader = (serviceTitle, serviceDescription) => {
    return (
      <Box pad="small">
        <Box direction="row" justify="between">
          <Text size="large" weight="bold">{serviceTitle}</Text>
          <PlainButton icon={<FormDown />} />
        </Box>
        <Text>{serviceDescription}</Text>
      </Box>
    )
  };

  renderListOfMethods = (service) => {
    const serviceMethods = service.methods;
    const { serviceTitle, description } = service;

    const views = serviceMethods.map((method, index) =>
      <Box key={index} pad="small" background="light-1">
        <Button onClick={() => this.props.onSelectServiceMethod({ serviceTitle, description, method })}>
          <Text>{method.methodName}</Text>
        </Button>
      </Box>)
    return views;
  }

  renderServiceItem = () => {
    const { services } = this.props;
    const views = services.map((item, index) =>
      <AccordionPanel
        key={index}
        header={this.renderPanelHeader(item.serviceTitle, item.description)}
      >
        {this.renderListOfMethods(item)}
      </AccordionPanel>)

    return views;
  }

  render() {
    return (
      <Accordion
        style={{ overflowY: 'scroll', maxHeight: 400 }}
        onActive={newActiveIndex => this.setState({ activeIndex: newActiveIndex })}
      >
        {this.renderServiceItem()}
      </Accordion>
    );
  }
}



