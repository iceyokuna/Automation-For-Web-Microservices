import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Heading, Text, Box, Button,
  Layer, TextInput, FormField,
} from 'grommet'
import { UserAdd } from 'grommet-icons'

import { workflowActions } from 'actions';

export class index extends Component {

  state = {
    preInputs: [],
    serviceMethod: null,
  }

  onTimeChange = (dateTime) => {
    this.setState({ targetTime: dateTime });
  }

  onColseDialog = () => {
    // this.props.dispatch(workflowActions.toggleTimerDialog());
  }

  onSetPreInput = () => {
    console.log(this.state.targetTime);
    this.onColseDialog();
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
            <Box pad="medium" gap="small" width="360px" direction="column">
              <Heading level={2} margin="none">
                Predefine Input
              </Heading>

              <Text size="bold">
                Input Interface
              </Text>

              <Box gap="small">
                <Text>

                </Text>
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
