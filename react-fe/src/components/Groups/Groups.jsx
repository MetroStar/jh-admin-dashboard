import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import {
    Link
} from 'react-router-dom'
import { jhapiRequest } from '../../util/jhapiUtil'

class Groups extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var {
            user_data,
            groups_data,
            dispatch,
            refreshGroupsData,
            refreshUserData,
        } = this.props

        if( !groups_data || !user_data ) { return <div></div> }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-10 col-lg-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading"><h4>Groups</h4></div>
                            <div className="panel-body">
                                {
                                    groups_data.map((e, i) => 
                                        <div key={"group-edit" + i}>
                                            <h4><Link to={{
                                                pathname: "/group-edit",
                                                state: {
                                                    group_data: e,
                                                    user_data: user_data,
                                                    callback: () => {
                                                        refreshGroupsData()
                                                        refreshUserData()
                                                    }
                                                },
                                            }}>{e.name}</Link></h4>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="panel-footer">
                                <div className="btn btn-light"><Link to="/">Back</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const withGroupsAPI = withProps(props => ({
    refreshGroupsData: () => jhapiRequest("/groups", "GET").then(data => data.json()).then(data => props.dispatch({ type: "GROUPS_DATA", value: data })),
    refreshUserData: () => jhapiRequest("/users", "GET").then(data => data.json()).then(data => props.dispatch({ type: "USER_DATA", value: data })),
    addUsersToGroup: (name, new_users) => jhapiRequest("/groups/" + name + "/users", "POST", { body: { users: new_users }, json: true }),
    removeUsersFromGroup: (name, removed_users) => jhapiRequest("/groups/" + name + "/users", "DELETE", { body: { users: removed_users }, json: true })
}))

export default compose(
    connect(
        state => ({ 
            user_data: state.user_data,
            groups_data: state.groups_data
        })
    ),
    withGroupsAPI
)(Groups)