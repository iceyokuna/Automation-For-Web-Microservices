import React, { Component } from 'react'

import {
  Box, Button,
  Heading,
} from 'grommet';

import { Add } from 'grommet-icons';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style';
import { colors } from 'theme'

import FlowItem from 'components/flow_item'

import { myFlows as myFlowsMockup } from './mockup'
import { workflowActions } from 'actions';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

class MyFlows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      myFlows: [],
    }
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(workflowActions.resetToInitialParams());
    dispatch(workflowActions.getMyFlows());
  }

  componentWillReceiveProps(nextProps) {
    console.log({ nextProps });
  }


  onCreateFlow = () => {
    const { match, history, dispatch, } = this.props;
    dispatch(workflowActions.resetToInitialParams());
    history.push(match.url + '/create/add_information');
  }

  onActiveTab = index => this.setState({ activeTabIndex: index });

  onSelectFlow = flow => {
    this.props.dispatch(workflowActions.setCurrentFlow(flow.id));
  }

  onDeleteFlow = (flow) => {
    this.props.dispatch(workflowActions.deleteWorkflowById(flow.id));
  }

  renderFlows = () => {
    const { workflowMyFlows } = this.props;
    const { myFlows, loadingMyFlows } = workflowMyFlows;

    if (loadingMyFlows) {
      return (
        <Box fill="horizontal" justify="center" align="center" margin={{ top: 'large' }}>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple"
            color={colors.brand} />
        </Box>
      );
    }
    return myFlows.map((item, index) =>
      <Col key={index} lg={4} md={4} sm={12} xs={12}>
        <FlowItem
          onEdit={() => this.onSelectFlow(item)}
          delay={index}
          onSelectFlow={() => this.onSelectFlow(item)}
          name={item.name}
          description={item.description}
          owner={item.user_id}
          onDelete={() => this.onDeleteFlow(item)}
          type={item.type} />
      </Col>
    )
  }

  render() {
    return (
      <div style={global.mainContainer}>
        <Box pad={{ horizontal: 'medium' }}>
          <Row>
            <Col lg={8} sm={8} xs={6}>
              <Box direction="row" align="center">
                <Heading size='small' margin={{ right: 'medium' }}>My flows</Heading>
              </Box>
            </Col>

            <Col lg={4} sm={4} xs={6}>
              <Box direction="row" align="center" fill justify="end">
                <Button label="Flow" primary icon={<Add />} color="accent-1" onClick={() => this.onCreateFlow()} />
              </Box>
            </Col>
          </Row>
        </Box>

        <Box pad={{ bottom: 'large', horizontal: 'small' }}>
          <Row >
            {this.renderFlows()}
          </Row>
        </Box>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflowMyFlows: state.workflowMyFlows,
  }
}

export default connect(mapStateToProps)(MyFlows);