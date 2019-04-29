import React, { Component } from 'react'

import { Box, Text, Select, FormField } from 'grommet'
import { FastForward } from 'grommet-icons'
import Variable from 'components/variable_item';
import { colors } from 'theme';

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
          <FormField>
            <Select
              size="medium"
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
          </FormField>

          <FormField>
            <Select
              size="medium"
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
          </FormField>

          <FormField>
            <Select
              size="medium"
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
          </FormField>

          <Box
            pad="small"
            justify="center"
            align="center">
            <FastForward color={colors["dark-2"]} />
          </Box>

          <FormField>
            <Select
              size="medium"
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
          </FormField>
        </Box >
      </Box>
    )
  }
}
