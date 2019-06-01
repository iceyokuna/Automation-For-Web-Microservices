import React, { useState, useEffect, } from 'react'

import { Box, CheckBox } from 'grommet'
import ServiceList from 'components/service_list'
import { connect } from 'react-redux';
import { workflowActions } from 'actions';

function TaskProperty({ services, isAsync, taskId, onSelectServiceMethod, ...props }) {

  const onToggleAsync = (checked) => {
    props.dispatch(workflowActions.applyAsyncToTask(taskId, checked))
  }

  return (
    <Box gap="small" margin={{ bottom: 'small' }}>
      <CheckBox
        toggle
        label="Asynchronous"
        checked={isAsync}
        onChange={event => onToggleAsync(event.target.checked)} />
      <Box fill="horizontal">
        <ServiceList services={services}
          onSelectServiceMethod={(serviceMethod) => onSelectServiceMethod(serviceMethod)} />
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}


export default connect(mapStateToProps)(TaskProperty);