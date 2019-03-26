import React from 'react'

import { Box, CheckBox } from 'grommet'
import ServiceList from 'components/service_list'

export default function TaskProperty({ services, onSelectServiceMethod }) {
  return (
    <Box gap="small">
      {/* <CheckBox
              toggle
              label="Asynchronous"
              checked={isAsyncTask}
              onChange={event => this.setState({ isAsyncTask: event.target.checked })} /> */}
      <Box fill="horizontal">
        <ServiceList services={services}
          onSelectServiceMethod={(serviceMethod) => onSelectServiceMethod(serviceMethod)} />
      </Box>
    </Box>
  )
}
