import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose' 

import { Link } from 'react-router-dom'
import Multiselect from '../Multiselect/Multiselect'
import { jhapiRequest } from '../../util/jhapiUtil'

class GroupEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            changed: false
        }
    }

    render() {

        if( !(this.props.location.state) ) {
            this.props.history.push("/groups")
            return <></>
        }

        var {
            group_data,
            user_data,
            callback,
        } = this.props.location.state

        var {
            addToGroup,
            removeFromGroup,
        } = this.props

        if( !(group_data && user_data) ) return <div></div>

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                        <h3>Editing Group {group_data.name}</h3>
                        <br></br>
                        <div className="alert alert-info">Select group members</div>
                        <Multiselect options={user_data.map(e => e.name)} value={group_data.users} onChange={
                            (selection, options) => {
                                this.setState({ selected: selection, changed: true })
                            }
                        } />
                        <br></br>
                        <button className="btn btn-light"><Link to="/groups">Back</Link></button>
                        <span> </span>
                        <button className="btn btn-primary" onClick={
                            () => {
                                // check for changes
                                if( !this.state.changed ) {
                                    this.props.history.push("/groups")
                                    return
                                } 

                                let new_users = this.state.selected.filter(e => !(group_data.users.includes(e)))
                                let removed_users = group_data.users.filter(e => !(this.state.selected.includes(e)))


                                let promiseQueue = []
                                if( new_users.length > 0 ) promiseQueue.push(addToGroup(new_users, group_data.name))
                                if( removed_users.length > 0) promiseQueue.push(removeFromGroup(removed_users, group_data.name))

                                Promise.all(promiseQueue)
                                .then(e => callback())

                                this.props.history.push("/groups")
                            }
                        }>Apply</button>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }
}

const withGroupsAPI = withProps(props => ({
    addToGroup: (users, groupname) => jhapiRequest("/groups/" + groupname + "/users", "POST", { users }),
    removeFromGroup: (users, groupname) => jhapiRequest("/groups/" + groupname + "/users", "DELETE", { users })
}))

export default compose(
    connect(),
    withGroupsAPI
)(GroupEdit)