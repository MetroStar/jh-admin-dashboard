import React, { Component } from 'react'
import {
    compose,
    withProps,
    withHandlers
} from 'recompose'
import { connect } from 'react-redux'

import { ServerDashboard } from './ServerDashboard.pre'

const withServerHandlers = withHandlers({
    
})

const withServerProp = withProps( props => ({}))

export default compose(
    // connect()
)(ServerDashboard)