import React, { useState, useEffect, } from 'react'

import { Box, CheckBox } from 'grommet'
import ServiceList from 'components/service_list'
import { connect } from 'react-redux';
import { workflowActions } from 'actions';

function TaskProperty({ taskId, onSelectServiceMethod, ...props }) {

  const { availableServices } = props;

  const onToggleAsync = (checked) => {
    props.dispatch(workflowActions.applyAsyncToTask(taskId, checked))
  }

  return (
    <Box gap="small" margin={{ bottom: 'small' }}>
      <CheckBox
        toggle
        label="Asynchronous"
        checked={props.appliedAsyncs[taskId] == true ? true : false}
        onChange={event => onToggleAsync(event.target.checked)} />
      <Box fill="horizontal">
        <ServiceList services={availableServices.data}
          onSelectServiceMethod={(serviceMethod) => onSelectServiceMethod(serviceMethod)} />
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    appliedAsyncs: state.workflow.appliedAsyncs,
    availableServices: state.availableServices,
  }
}

export default connect(mapStateToProps)(TaskProperty);