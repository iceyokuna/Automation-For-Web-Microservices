import React, { Component } from 'react'

import ConditionItem from 'components/condition_item'
import { Box, Layer, Text, Button } from 'grommet'
import { Add } from 'grommet-icons'



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
    
  }


  changeCondition = (index, condition) => {
    const { conditions } = this.state;
    conditions[index] = condition;
    console.log(conditions)
    this.setState({
      conditions: conditions
    })
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
          {this.renderConditionItems()}

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
