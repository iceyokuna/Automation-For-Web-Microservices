import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text, Select } from 'grommet'
import { FormNextLink } from 'grommet-icons'



const Variable = ({ name, type }) => {
  return (
    <Box direction="row" gap="small" pad="small">
      <Text>{name}</Text>
      <Text>:</Text>
      <Text>{type}</Text>
    </Box>
  );
}

const Option = ({ value }) => {
  return (
    <Box pad="small">
      <Text>{value}</Text>
    </Box>
  );
}

export default class ConditionItem extends Component {

  state = {
    variable1: {},
    variable2: {},
    operator: '',
    targetNode: '',
  }

  changeCondition = () => {
    this.props.onChange(this.state);
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.changeCondition();
  }


  render() {
    const { variable1, operator, variable2, targetNode } = this.state
    const { allVariables, allOperators, allBpmnNodes } = this.props

    return (
      <Box direction="row" gap="small">
        <Box>
          <Select
            size="small"
            dropHeight="medium"
            placeholder="Variable 1"
            value={variable1.name}
            options={allVariables}
            onChange={({ option }) => {
              this.setState({ variable1: option });
            }}
          >
            {(option, index) => (
              <Variable name={option.name} type={option.type} />
            )}
          </Select>
        </Box>

        <Box>
          <Select
            size="small"
            dropHeight="medium"
            placeholder="Operator"
            value={operator}
            options={allOperators}
            onChange={({ option }) => {
              this.setState({ operator: option });
            }}
          >
            {(option, index) => (
              <Option value={option} />
            )}

          </Select>
        </Box>

        <Box>
          <Select
            size="small"
            dropHeight="medium"
            placeholder="Variable 2"
            value={variable2.name}
            options={allVariables}
            onChange={({ option }) => {
              this.setState({ variable2: option });
            }}
          >
            {(option, index) => (
              <Variable name={option.name} type={option.type} />
            )}

          </Select>
        </Box>

        <Box
          pad="small"
          justify="center"
          align="center">
          <FormNextLink />
        </Box>

        <Box>
          <Select
            size="small"
            placeholder="Target Node"
            value={targetNode}
            options={allBpmnNodes}
            onChange={({ option }) => {
              this.setState({ targetNode: option });
            }}
          >
            {(option, index) => (
              <Option value={option} />
            )}

          </Select>
        </Box>
      </Box>
    )
  }
}
