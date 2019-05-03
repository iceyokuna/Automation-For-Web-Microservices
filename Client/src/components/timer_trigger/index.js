import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Heading, Box, Button,
  Layer, Calendar, MaskedInput
} from 'grommet';

import { workflowActions } from 'actions';

import 'flatpickr/dist/themes/light.css'
import './index.css';
import moment from 'moment';

export class index extends Component {

  state = {
    showTimerDialog: false,
    targetDate: new Date(),
    targetTime: '',
  }

  onDateChange = (dateTime) => {
    this.setState({ targetDate: moment(dateTime).format('l') });
  }

  onTimeChange = (event) => {
    this.setState({ targetTime: event.target.value });
  }

  onColseDialog = () => {
    this.props.dispatch(workflowActions.toggleTimerDialog());
  }

  onSetTimer = () => {
    const { currentNode } = this.props;
    const { targetDate, targetTime } = this.state;
    const dateTime = { targetDate, targetTime };
    this.props.dispatch(workflowActions.applyTimerToElement(
      currentNode.id,
      dateTime))
    this.onColseDialog();
  }

  render() {
    const { workflowTimers } = this.props;
    const { targetDate, targetTime } = this.state;
    return (
      <Fragment>
        {workflowTimers.showTimerDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" direction="column">
              <Heading level={2} margin="none">
                Set a timer
              </Heading>

              <Box id="datepicker-container" margin={{ bottom: 'small' }} gap="small">
                <Calendar
                  date={targetDate}
                  onSelect={this.onDateChange}
                  size="medium"
                />
                <MaskedInput
                  mask={[
                    {
                      length: [1, 2],
                      options: Array.from({ length: 12 }, (v, k) => k + 1),
                      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                      placeholder: "hh"
                    },
                    { fixed: ":" },
                    {
                      length: 2,
                      options: ["00", "15", "30", "45"],
                      regexp: /^[0-5][0-9]$|^[0-9]$/,
                      placeholder: "mm"
                    },
                    { fixed: " " },
                    {
                      length: 2,
                      options: ["am", "pm"],
                      regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                      placeholder: "ap"
                    }
                  ]}
                  value={targetTime}
                  onChange={this.onTimeChange}
                />
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
  currentNode: state.workflow.currentNode,
})

export default connect(mapStateToProps)(index)
