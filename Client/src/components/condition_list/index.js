import React, { Component } from 'react'

import ConditionItem from 'components/condition_item'

import { Box, Layer, Text, Button } from 'grommet'



export default class ConditionList extends Component {

  state = {
    conditions: [
      { var1: 'Salary', operator: '>', var2: 50000, nextNode: 'Task_22323' },
      { var1: 'Salary', operator: '>', var2: 50000, nextNode: 'Task_22323' },
      { var1: 'Salary', operator: '>', var2: 50000, nextNode: 'Task_22323' },
    ],
  }

  close = () => {
    this.setState({ show: undefined });
    this.props.onCloseConditionList();
  }

  applyConditions = () => {

  }


  renderConditionItems = () => {
    const { variables, operators, bpmnNodes } = this.props
    return this.state.conditions.map((item, index) =>
      <ConditionItem allVariables={variables} allOperators={operators} allBpmnNodes={bpmnNodes} />)
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
            onPress={() => this.applyConditions()} />
        </Box>


      </Layer>
    )
  }
}
