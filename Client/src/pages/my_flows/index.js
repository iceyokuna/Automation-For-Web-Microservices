import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
  Tabs,
  Tab,
} from 'grommet';

import { Add } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';

import FlowItem from 'components/flow_item'

import { myFlows } from './mockup'

export default class MyFlow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      myFlows: myFlows,
    }
  }

  onCreateFlow = () => {
    this.props.history.push('my_flows/create/add_information');

  }

  onActiveTab = index => this.setState({ activeTabIndex: index });

  onSelectFlow = flow => {
    const { history, match } = this.props;
    history.push(match.url + '/' + flow.title);
  }

  renderFlows = () => {
    const { myFlows } = this.state;

    const views = myFlows.map((item, index) =>
      <Col key={index} lg={4} md={4} sm={12} xs={12}>
        <FlowItem onSelectFlow={() => { this.onSelectFlow(item) }}
          {...item} />
      </Col>
    )

    return views;
  }


  render() {
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Row>
            <Col lg={8} sm={8} xs={12}>
              <Box direction="row" align="center">
                <Heading size='small' margin={{ right: 'medium' }}>My Flows</Heading>
                <Tabs activeIndex={this.state.activeTabIndex} onActive={this.onActiveTab}>
                  <Tab title="Active" />
                  <Tab title="Stopped" />
                </Tabs>
              </Box>
            </Col>

            <Col lg={4} sm={4} xs={12}>
              <Box direction="row" align="center" fill justify="end">
                <Button label="New Flow" primary icon={<Add />} color="accent-1" onClick={() => this.onCreateFlow()} />
              </Box>
            </Col>
          </Row>
        </Box>

        <Row >
          {this.renderFlows()}
        </Row>


      </div>
    )
  }
}
