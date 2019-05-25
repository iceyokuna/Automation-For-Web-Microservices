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
      <Box pad={{ vertical: 'small', right: 'small' }} >
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

  renderListOfMethods = (service, currentMethodId) => {
    const { id, name, info, methods } = service;
    const serviceId = id;
    return methods.map((method, index) => {
      const active = currentMethodId == method.id ?
        { size: "medium", color: "accent-4", side: "left" } : null;
      return (
        <Box key={index} background="light-1"  >
          <Box border={active} pad={{ left: 'small' }}>
            <Button fill hoverIndicator onClick={() => this.props.onSelectServiceMethod({ serviceId, name, info, method })}>
              <Box pad='small'>
                <Text >{method.name}</Text>
              </Box>
            </Button>
          </Box>
        </Box>);
    })
  }

  renderServiceItem = () => {
    const { services, workflow } = this.props;
    const { appliedMethods } = workflow;
    const currentNodeId = workflow.currentNode != null
      ? workflow.currentNode.id : -1;

    const currentServiceId = appliedMethods[currentNodeId] != null ?
      appliedMethods[currentNodeId].serviceId : -1;

    const currentMethodId = appliedMethods[currentNodeId] != null ?
      appliedMethods[currentNodeId].method.id : -1;

    return services.map((item, index) =>
      <AccordionPanel
        key={index}
        header={this.renderPanelHeader(item.name, item.info, currentServiceId, item.id)}
      >
        {this.renderListOfMethods(item, currentMethodId)}
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