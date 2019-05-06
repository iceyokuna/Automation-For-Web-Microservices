import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  Heading, Box, Button,
  Layer, Calendar, MaskedInput, TextInput,
  Text, FormField
} from 'grommet';

import { workflowActions } from 'actions';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'flatpickr/dist/themes/light.css'
import './index.css';
import moment from 'moment';

export class index extends Component {

  state = {
    showTimerDialog: false,
    targetDate: moment(Date()).format('l'),
    targetTime: '',
    currentTabIndex: 0,

    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 10,

    countdownError: false,
  }

  componentWillReceiveProps(nextProps) {
    const { currentNode, workflowTimers } = nextProps;

    const { appliedTimers } = workflowTimers;

    const currentTimer = appliedTimers[currentNode.id];
    if (currentTimer) {
      this.setState({ ...currentTimer });
    }
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
    let { targetDate, targetTime, currentTabIndex,
      days, hours, minutes, seconds } = this.state;

    if (currentTabIndex == 0) {
      // Convert time to 24 hrs format
      const time = moment(targetTime, "h:mm a").format("HH:mm");
      const dateTime = { targetDate, targetTime: time };
      this.props.dispatch(workflowActions.applyTimerToElement(
        currentNode.id,
        dateTime));
    } else {
      const countdownTime = {
        type: "countdown",
        days, hours, minutes, seconds,
      }
      this.props.dispatch(workflowActions.applyTimerToElement(
        currentNode.id,
        countdownTime));
    }

    this.onColseDialog();
  }

  onSelectTab = (currentTabIndex) => {
    this.setState({ currentTabIndex });
  }

  handleIsNumber = (num) => {
    if (isNaN(num)) {
      return "Accept only number !";
    }
    else {
      return "";
    }
  }

  renderTab1 = () => {
    const { targetDate, targetTime } = this.state;

    return (
      <Box id="datepicker-container" margin={{ bottom: 'small' }}
        animation="fadeIn" gap="small">
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

    );
  }

  renderTab2 = () => {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <Box direction="row" gap="medium" pad="small"
        animation="fadeIn">
        <Box gap="xsmall">
          <Text>Days</Text>
          <FormField error={this.handleIsNumber(days)}
            htmlFor="days">
            <TextInput size="xsmall" value={days}
              id="days"
              onChange={e => this.setState({
                days: e.target.value
              })} />
          </FormField>
        </Box>
        <Box gap="xsmall">
          <Text>Hours</Text>
          <FormField error={hours > 24 ? "Invalid" : null}
            htmlFor="hours">
            <TextInput size="xsmall" value={hours}
              id="hours"
              onChange={e => this.setState({
                hours: e.target.value
              })} />
          </FormField>
        </Box>
        <Box gap="xsmall">
          <Text>Minutes</Text>
          <FormField error={minutes > 60 ? "Invalid" : null}
            htmlFor="minutes">
            <TextInput size="xsmall" value={minutes}
              id="minutes"
              onChange={e => this.setState({
                minutes: e.target.value
              })} />
          </FormField>
        </Box>
        <Box gap="xsmall">
          <Text>Seconds</Text>
          <FormField error={seconds > 60 ? "Invalid" : null}
            htmlFor="seconds">
            <TextInput size="xsmall" value={seconds}
              id="seconds"
              onChange={e => this.setState({
                seconds: e.target.value
              })} />
          </FormField>
        </Box>
      </Box>
    );
  }


  render() {
    const { workflowTimers } = this.props;
    const { currentTabIndex } = this.state;
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

              <Tabs
                selectedIndex={currentTabIndex}
                onSelect={this.onSelectTab}>
                <TabList>
                  <Tab >Date time</Tab>
                  <Tab >Countdown</Tab>
                </TabList>

                <TabPanel>
                  {this.renderTab1()}
                </TabPanel>
                <TabPanel>
                  {this.renderTab2()}
                </TabPanel>
              </Tabs>

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
