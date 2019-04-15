import React, { Component } from 'react'

import ConditionItem from 'components/condition_item'
import { Box, Layer, Text, Button } from 'grommet'
import { Add } from 'grommet-icons'

import { connect } from 'react-redux'
import { workflowActions } from 'actions';

const emptyCondition = {
  "variable1": {
    "name": null,
    "type": null
  },
  "variable2": {
    "name": null,
    "type": null
  },
  "operator": null,
  "targetNode": null
};

class ConditionList extends Component {

  state = {
    conditions: [],
  }

  close = () => {
    this.props.onCloseConditionList();
  }

  addMoreCondition = () => {
    const { conditions } = this.state;
    conditions.push(emptyCondition);
    this.setState({ conditions: conditions });
  }

  applyConditions = () => {
    const { gatewayElement } = this.props;
    const { conditions } = this.state;
    this.props.dispatch(
      workflowActions.applyConditionsToGateWay(
        gatewayElement.id,
        conditions)
    );

    this.setState({ conditions: [] });
    this.close();
  }

  changeCondition = (index, condition) => {
    const { conditions } = this.state;
    conditions[index] = condition;
    this.setState({
      conditions: conditions
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { workflow } = nextProps;
    if (workflow.currentNode != null) {
      const { workflowConditions } = nextProps;
      const currentId = workflow.currentNode.id;
      const currentConditions = workflowConditions.appliedConditions[currentId];
      this.state = {
        conditions: currentConditions || [],
      }
    }
  }

  renderConditionItems = () => {
    const { workflowConditions } = this.props
    const { operators, allVariables, bpmnNodes } = workflowConditions;
    return this.state.conditions.map((item, index) =>
      <ConditionItem
        onChange={(condition) => this.changeCondition(index, condition)}
        allVariables={allVariables}
        allOperators={operators}
        allBpmnNodes={bpmnNodes}
        condition={item}
      />)
  }

  render() {
    const { show, } = this.props;
    return (
      show &&
      <Layer
        position="center"
        modal
        onClickOutside={this.close}
        onEsc={this.close}
      >
        <Box gap="small" pad="medium" width="800px" >
          <Text weight="bold" size="xlarge">Conditions for this gateway</Text>
          <Box height="300px" overflow={{ vertical: 'auto' }}>
            {this.renderConditionItems()}
          </Box>

          <Box direction="row" justify="end" gap="small">
            <Button
              icon={<Add />}
              label="Condition"
              onClick={() => this.addMoreCondition()} />

            <Button
              style={{ width: 80 }}
              color="brand"
              label="Apply"
              primary
              onClick={() => this.applyConditions()} />
          </Box>

        </Box>


      </Layer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow,
    workflowConditions: state.workflowConditions,
  }
}


export default connect(mapStateToProps)(ConditionList);
