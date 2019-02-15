import React, { Component } from 'react'

import ConditionItem from 'components/condition_item'
import { Box, Layer, Text, Button } from 'grommet'



export default class ConditionList extends Component {

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

  applyConditions = () => {

  }

  changeCondition = (index, condition) => {
    console.log(index, condition)
  }


  renderConditionItems = () => {
    const { variables, operators, bpmnNodes } = this.props
    return this.state.conditions.map((item, index) =>
      <ConditionItem
        onChange={(condition) => this.changeCondition(index, condition)}
        allVariables={variables}
        allOperators={operators}
        allBpmnNodes={bpmnNodes} />)
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
        <Box gap="small" pad="medium" width="800px">
          <Text weight="bold" size="xlarge">Conditions for this gateway</Text>
          {/* <ConditionItem variable={variables} operators={operators} />
          <ConditionItem variable={variables} operators={operators} />
          <ConditionItem variable={variables} operators={operators} /> */}
          {this.renderConditionItems()}
          <Button
            color="brand"
            label="Apply"
            primary
            alignSelf="end"
            onPress={() => this.applyConditions()} />
        </Box>


      </Layer>
    )
  }
}
