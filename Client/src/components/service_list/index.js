import React, { Component, Fragment } from 'react'

import {
  Box, Text, Accordion,
  AccordionPanel, Button,
} from 'grommet'
import { FormDown, Refresh, } from 'grommet-icons'
import PlainButton from 'components/plain_button'

import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { availableServicesActions, userServicesActions } from 'actions';

class index extends Component {

  state = {
    activeIndex: [0],
    activeTabIndex: 0,
    selectedServiceMethod: null,
  };

  onSelectTab = (activeTabIndex) => {
    this.setState({ activeTabIndex });
  }

  componentWillReceiveProps(nextProps) {
    console.log({ nextProps });
  }

  onRefreshServices = () => {
    this.props.dispatch(availableServicesActions.getAllServices());
    this.props.dispatch(userServicesActions.getUserServices());
  }

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

  renderServices = () => {
    const { activeTabIndex } = this.state;
    let { userServices, providedServices, workflow } = this.props;
    let services = activeTabIndex == 0 ? userServices
      : providedServices;
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
    const { activeTabIndex } = this.state;
    return (
      <Fragment>
        <Tabs
          selectedIndex={activeTabIndex}
          onSelect={this.onSelectTab}>
          <Box direction="row" justify="between">
            <TabList>
              <Tab >User</Tab>
              <Tab >Provided</Tab>
            </TabList>
            <PlainButton icon={<Refresh />} onClick={this.onRefreshServices} />
          </Box>
        </Tabs>
        <Scrollbars style={{height: 300}} >
          <Accordion
            style={{ overflow: 'hidden' }}
            onActive={newActiveIndex => this.setState({ activeIndex: newActiveIndex })}
          >
            {this.renderServices()}
          </Accordion>
        </Scrollbars>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  workflow: state.workflow,
});

export default connect(mapStateToProps)(index);