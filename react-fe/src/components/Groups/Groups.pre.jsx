import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom'

export class Groups extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var {
            user_data,
            groups_data,
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
                                        <div key={"group-edit" + i} className="group-edit-link">
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