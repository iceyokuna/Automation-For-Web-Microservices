import React, { Component } from 'react'

import ConditionItem from 'components/condition_item'
import { Box, Layer, Text, Button } from 'grommet'
import { Add } from 'grommet-icons'

import { connect } from 'react-redux'
import { workflowActions } from 'actions';


class ConditionList extends Component {

  state = {
    conditions: [
      {
        "variable1": {
          "name": "Salary",
          "type": "Number"
        },
        "variable2": {
          "name": "Salary",
          "type": "Number"
        },
        "operator": "==",
        "targetNode": "TASK_1132"
      },
    ],
  }


  close = () => {
    this.props.onCloseConditionList();
  }


  addMoreCondition = () => {
    const { conditions } = this.state;
    conditions.push({
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
    });
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

  }

  renderConditionItems = () => {
    const { workflowConditions } = this.props
    console.log(workflowConditions)
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
    const { show, workflowConditions } = this.props;
    console.log(workflowConditions);
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
