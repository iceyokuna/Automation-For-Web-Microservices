import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Heading, Text, Box, Button, Layer } from 'grommet'
import { UserAdd } from 'grommet-icons'

import { workflowActions } from 'actions';

import 'flatpickr/dist/themes/light.css'
import './index.css';
import Flatpickr from 'react-flatpickr'


export class index extends Component {

  state = {
    showTimerDialog: false,
    date: new Date(),
  }


  onSetTimer = () => {


    this.onColseDialog();
  }

  onColseDialog = () => {
    this.props.dispatch(workflowActions.toggleTimerDialog());
  }

  render() {
    const { workflowTimers } = this.props;
    const { date } = this.state;
    return (
      <Fragment>
        {workflowTimers.showTimerDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="360px" direction="column">
              <Heading level={2} margin="none">
                Set timer trigger
              </Heading>

              <Box id="datepicker-container" margin={{ bottom: 'small' }}>
                <Flatpickr
                  data-enable-time
                  value={date}
                  options={{
                    inline: true
                  }}
                  onChange={date => { this.setState({ date }) }} />
              </Box>

              <Box direction="row" justify="end" align="center" gap="small">
                <Button label="Ok" primary onClick={this.onSetTimer} />
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
  workflowTimers: state.workflowTimers,
})

export default connect(mapStateToProps)(index)
