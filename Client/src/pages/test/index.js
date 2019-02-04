import React, { Component } from 'react'
import { ClientStyle as Style } from 'react-css-component'
import { socketActions } from 'actions'
import { connect } from 'react-redux'
import { Button } from 'grommet'

import FloatDropdown from 'components/float_dropdown'

class Test extends Component {

  render() {
    return (
      <div>
        <FloatDropdown />
      </div>
    )
  }
}

export default connect(null, null)(Test);