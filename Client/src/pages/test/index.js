import React, { Component } from 'react'
import { ClientStyle as Style } from 'react-css-component'
import { socketActions } from 'actions'
import { connect } from 'react-redux'

import ConditionItem from 'components/condition_item'

class Test extends Component {

  render() {
    return (
      <div>
        <ConditionItem />
      </div>
    )
  }
}

export default connect(null, null)(Test);