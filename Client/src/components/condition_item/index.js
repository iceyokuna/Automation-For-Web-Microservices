import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text, Select } from 'grommet'


const variables = [
  { name: 'Salary', type: 'Number' },
  { name: 'Single', type: 'Boolean' },
  { name: 'Name', type: 'String' },
];

const Variable = ({ name, type }) => {
  return (
    <Box direction="row" gap="small" pad="small">
      <Text>{name}</Text>
      <Text>:</Text>
      <Text>{type}</Text>
    </Box>
  );
}


export default class ConditionItem extends Component {

  state = {
    variable1: {},
    variable2: {},
    operator: null,
    targetNode: null,
  }

  render() {
    const { variable1 } = this.state
    
    return (
      <Box direction="row">
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

      </Box>
    )
  }
}
