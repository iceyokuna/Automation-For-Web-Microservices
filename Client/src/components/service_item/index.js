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

  renderPanelHeader = () => {
    const { serviceTitle, serviceDescription } = this.props;

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

  renderListOfMethods = () => {
    const { serviceMethods } = this.props;
    const views = serviceMethods.map((item, index) =>
      <Box key={index} pad="small" background="light-1">
        <Button>
          <Text>{item.methodName}</Text>
        </Button>
      </Box>)
    return views;
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Accordion
        onActive={newActiveIndex => this.setState({ activeIndex: newActiveIndex })}
      >
        <AccordionPanel
          header={this.renderPanelHeader()}
        >
          {this.renderListOfMethods()}
        </AccordionPanel>
      </Accordion>
    );
  }
}



