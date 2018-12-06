import React, { Component } from 'react'

import { Box, Text, Accordion, AccordionPanel, TextInput, Button } from 'grommet'
import { FormDown } from 'grommet-icons'
import Avatar from 'react-avatar';
import DropContent from 'components/dropdown_content'
import PlainButton from 'components/plain_button'


export default class index extends Component {

  state = {
    activeIndex: [0]
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

  renderListOfMethods = (serviceMethods) => {
    const views = serviceMethods.map((item, index) =>
      <Box key={index} pad="small" background="light-1">
        <Button>
          <Text>{item.methodName}</Text>
        </Button>
      </Box>)
    return views;
  }

  renderServiceItem = () => {
    const { services } = this.props;
    const views = services.map((item, index) =>
      <AccordionPanel
        header={this.renderPanelHeader(item.serviceTitle, item.description)}
      >
        {this.renderListOfMethods(item.methods)}
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



