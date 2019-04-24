import React, { Component } from 'react'

import { Box, Text, Select } from 'grommet'
import { FormNextLink } from 'grommet-icons'
import Variable from 'components/variable_item';

const Option = ({ value }) => {
  return (
    <Box pad="small">
      <Text>{value}</Text>
    </Box>
  );
}

export default class ConditionItem extends Component {

  constructor(props) {
    super(props);
    const { variable1, variable2, operator, targetNode } = props.condition;
    this.state = {
      variable1: variable1 || '',
      variable2: variable2 || '',
      operator: operator || '',
      targetNode: targetNode || '',
    }
  }

  onChangeCondition = () => {
    this.props.onChange(this.state);
  }

  render() {
    const { variable1, operator, variable2, targetNode } = this.state
    const { allVariables, allOperators, allBpmnNodes, } = this.props;
    return (
      <Box height="60px" flex={false}>
        <Box direction="row" gap="small">
          <Select
            size="small"
            dropHeight="medium"
            placeholder="Variable 1"
            value={variable1.name}
            options={allVariables}
            onChange={({ option }) => {
              this.setState({ variable1: option },
                () => this.onChangeCondition());
            }}
          >
            {(option, index) => (
              <Variable name={option.name} type={option.type}
                methodName={option.variableOf.methodName}
                methodOfTaskId={option.variableOf.methodOfTaskId} />
            )}
          </Select>

          <Select
            size="small"
            dropHeight="medium"
            placeholder="Operator"
            value={operator}
            options={allOperators}
            onChange={({ option }) => {
              this.setState({ operator: option },
                () => this.onChangeCondition());
            }}
          >
            {(option, index) => (
              <Option value={option} />
            )}

          </Select>

          <Select
            size="small"
            dropHeight="medium"
            placeholder="Variable 2"
            value={variable2.name || variable2}
            options={allVariables}
            onChange={({ option }) => {
              this.setState({ variable2: option },
                () => this.onChangeCondition());
            }}
            onSearch={text => {
              const value = {
                "variableOf": {
                  "serviceId": null,
                  "methodId": null,
                  "methodName": null,
                  "methodOfTaskId": null,
                },
                "name": null,
                "type": null,
                "value": text,
              }
              this.setState({
                variable2: value
              }, () => this.onChangeCondition());
            }}
          >
            {(option, index) => (
              <Variable name={option.name} type={option.type}
                methodName={option.variableOf.methodName}
                methodOfTaskId={option.variableOf.methodOfTaskId} />
            )}

          </Select>

          <Box
            pad="small"
            justify="center"
            align="center">
            <FormNextLink />
          </Box>

          <Select
            size="small"
            placeholder="Target Node"
            value={targetNode}
            options={allBpmnNodes}
            onChange={({ option }) => {
              this.setState({ targetNode: option },
                () => this.onChangeCondition());
            }}
            onSearch={text => {
              this.setState({
                targetNode: text
              }, () => this.onChangeCondition());
            }}
          >
            {(option, index) => (
              <Option value={option} />
            )}

          </Select>
        </Box >
      </Box>
    )
  }
}
