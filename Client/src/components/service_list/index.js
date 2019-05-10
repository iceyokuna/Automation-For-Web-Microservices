import React, { Component } from 'react'

import { Box, Text, Accordion, AccordionPanel, Button } from 'grommet'
import { FormDown } from 'grommet-icons'
import PlainButton from 'components/plain_button'

import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

class index extends Component {

  state = {
    activeIndex: [0],
    selectedServiceMethod: null,
  };

  renderPanelHeader = (name, info, currentServiceId, serviceId) => {
    const active = currentServiceId == serviceId ?
      { size: "medium", color: "accent-4", side: "left" } : null;
    return (
      <Box pad="small" >
        <Box border={active} pad={{ left: 'small' }}>
          <Box direction="row" justify="between">
            <Text size="large" weight="bold">{name}</Text>
            <PlainButton icon={<FormDown />} />
          </Box>
          <Text>{info}</Text>
        </Box>
      </Box >
    )
  };

  renderListOfMethods = (service) => {
    const { id, name, info, methods } = service;
    const serviceId = id;

    return methods.map((method, index) =>
      <Box key={index} background="light-1">
        <Button fill hoverIndicator onClick={() => this.props.onSelectServiceMethod({ serviceId, name, info, method })}>
          <Box pad='small'>
            <Text >{method.name}</Text>
          </Box>
        </Button>
      </Box>)
  }

  renderServiceItem = () => {
    const { services, workflow } = this.props;
    const { appliedMethods } = workflow;
    const currentNodeId = workflow.currentNode.id;
    const currentServiceId = appliedMethods[currentNodeId].serviceId;
    return services.map((item, index) =>
      <AccordionPanel
        key={index}
        header={this.renderPanelHeader(item.name, item.info, currentServiceId, item.id)}
      >
        {this.renderListOfMethods(item)}
      </AccordionPanel>)
  }

  render() {
    return (
      <Scrollbars autoHeightMax={360} autoHeight>
        <Accordion
          style={{ overflow: 'hidden' }}
          onActive={newActiveIndex => this.setState({ activeIndex: newActiveIndex })}
        >
          {this.renderServiceItem()}
        </Accordion>
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state) => ({
  workflow: state.workflow
});

export default connect(mapStateToProps)(index);