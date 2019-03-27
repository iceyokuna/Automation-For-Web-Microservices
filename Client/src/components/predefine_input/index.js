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
    inputInterfaces: [
      { variableName: 'email', value: 'treesakul@gmail.com' },
      { variableName: 'subject', value: '' },
      { variableName: 'message', value: '' },
    ]
  }

  onTimeChange = (dateTime) => {
    this.setState({ targetTime: dateTime });
  }

  onColseDialog = () => {
    this.props.dispatch(workflowActions.togglePreInputDialog());
  }

  onSetPreInput = () => {
    console.log(this.state.inputInterfaces);
    this.onColseDialog();
  }

  onChangePreInput = (event, index) => {
    const { inputInterfaces } = this.state;
    inputInterfaces[index].value = event.target.value;

    this.setState({
      inputInterfaces: inputInterfaces,
    })
  }


  renderPreInputValues = () => {
    const { inputInterfaces } = this.state;
    return inputInterfaces.map((item, index) =>
      <Fragment>
        <Text weight="bold" size="small">
          {item.variableName}
        </Text>
        <FormField>
          <TextInput value={item.value}
            onChange={(event) => this.onChangePreInput(event, index)} />
        </FormField>
      </Fragment>
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
})

export default connect(mapStateToProps)(index)
