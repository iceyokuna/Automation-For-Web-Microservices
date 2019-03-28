import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Heading, Text, Box, Button,
  Layer, TextInput, FormField,
} from 'grommet'

import { workflowActions } from 'actions';

export class index extends Component {

  state = {
    preInputs: [],
    serviceMethod: null,
    inputInterface: []
  }


  onTimeChange = (dateTime) => {
    this.setState({ targetTime: dateTime });
  }

  onColseDialog = () => {
    this.props.dispatch(workflowActions.togglePreInputDialog());
  }

  componentWillReceiveProps = (nextProps) => {
    const { appliedMethods, currentNode } = nextProps.workflow;
    if (currentNode && appliedMethods[currentNode.id]) {
      const inputInterface = appliedMethods[currentNode.id].method.input_interface;
      const listOfInputs = [];
      Object.keys(inputInterface).map((item, index) => {
        listOfInputs.push({
          variableName: item,
          value: ''
        })
      })
      this.setState({ inputInterface: listOfInputs });
    }
  }


  onSetPreInput = () => {
    console.log(this.state.inputInterface);

    // this.onColseDialog();
  }

  onChangePreInput = (event, index) => {
    const { inputInterface } = this.state;
    inputInterface[index].value = event.target.value;

    this.setState({
      inputInterface: inputInterface,
    })
  }


  renderPreInputValues = () => {
    const { inputInterface } = this.state;
    return inputInterface.map((item, index) =>
      <div key={item.variableName}>
        <Text weight="bold" size="small">
          {item.variableName}
        </Text>
        <FormField>
          <TextInput value={item.value}
            onChange={(event) => this.onChangePreInput(event, index)} />
        </FormField>
      </div>
    )
  }


  render() {
    const { workflowPreInputs } = this.props;
    const { targetTime } = this.state;
    return (
      <Fragment>
        {workflowPreInputs.showPreInputDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="500px" direction="column">
              <Heading level={2} margin="none">
                Pre-define Value for Input Interface
              </Heading>
              <Text>* Parameters required to use this service</Text>
              <Box gap="small">
                {this.renderPreInputValues()}
              </Box>

              <Box direction="row" justify="end" align="center" gap="small">
                <Button label="Ok" primary onClick={this.onSetPreInput} />
                <Button label="Close" onClick={this.onColseDialog} />
              </Box>

            </Box>
          </Layer>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  workflowPreInputs: state.workflowPreInputs,
  workflow: state.workflow,
})

export default connect(mapStateToProps)(index)
