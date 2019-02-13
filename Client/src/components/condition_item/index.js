import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text, Select } from 'grommet'


const variables = [
  { name: 'Salary', type: 'Number' },
  { name: 'Single', type: 'Boolean' },
  { name: 'Name', type: 'String' },
];

const operators = ['==', '!=', '<', '<=', '>', '>='];

const Variable = ({ name, type }) => {
  return (
    <Box direction="row" gap="small" pad="small">
      <Text>{name}</Text>
      <Text>:</Text>
      <Text>{type}</Text>
    </Box>
  );
}

const Operator = ({ value }) => {
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
    targetNode: null,
  }

  render() {
    const { variable1, operator, variable2 } = this.state

    return (
      <Box direction="row" gap="small">
        <Select
          dropHeight="medium"
          size="medium"
          placeholder="Variable 1"
          value={variable1.name}
          options={variables}
          onChange={({ option }) => { this.setState({ variable1: option }) }}
        >
          {(option, index) => (
            <Variable name={option.name} type={option.type} />
          )}

        </Select>

        <Select
          dropHeight="medium"
          size="medium"
          placeholder="Operator"
          value={operator}
          options={operators}
          onChange={({ option }) => { this.setState({ operator: option }) }}
        >
          {(option, index) => (
            <Operator value={option} />
          )}

        </Select>

        <Select
          dropHeight="medium"
          size="medium"
          placeholder="Variable 2"
          value={variable2.name}
          options={variables}
          onChange={({ option }) => { this.setState({ variable2: option }) }}
        >
          {(option, index) => (
            <Variable name={option.name} type={option.type} />
          )}

        </Select>

      </Box>
    )
  }
}
