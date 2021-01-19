import React, { Component } from 'react'
import { 
    Table,
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./server-dashboard.css"
import { timeSince } from '../../util/timeSince'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

export class ServerDashboard extends Component {
    constructor(props) {
        super(props)

        this.usernameDesc = e => e.sort((a, b) => a.name < b.name ? 1 : -1),
        this.usernameAsc = e => e.sort((a, b) => a.name > b.name ? 1 : -1),
        this.adminDesc = e => e.sort(a => a.admin ? 1 : -1),
        this.adminAsc = e => e.sort(a => a.admin ? -1 : 1),
        this.dateDesc = e => e.sort((a, b) => new Date(a.last_activity) - new Date(b.last_activity) > 0 ? -1 : 1 ),
        this.dateAsc = e => e.sort((a, b) => new Date(a.last_activity) - new Date(b.last_activity) > 0 ? 1 : -1 )

        this.state = {
            addUser: false,
            sortMethod: undefined
        }
    }

    render() {
        var { 
            user_data,
            updateUsers,
            shutdownHub,
            startServer,
            stopServer,
            startAll,
            stopAll,
            dispatch
        } = this.props

        var dispatchUserUpdate = data => {
            dispatch({
                type: "USER_DATA",
                value: data
            })
        }

        if( !user_data ) return <div></div>

        if(this.state.sortMethod != undefined)
            user_data = this.state.sortMethod(user_data)

        return (
            <div>
                <div className="manage-groups" style={{float: "right", margin: "20px"}}><Link to="/groups">{"> Manage Groups"}</Link></div>
                <div className="server-dashboard-container">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="admin-table-head">
                            <tr>
                            <th>User <SortHandler sorts={{ asc: this.usernameAsc, desc: this.usernameDesc }} callback={(e) => this.setState(Object.assign({}, this.state, { sortMethod: e }))} /></th>
                            <th>Admin <SortHandler sorts={{ asc: this.adminAsc, desc: this.adminDesc }} callback={(e) => this.setState(Object.assign({}, this.state, { sortMethod: e }))} /></th>
                            <th>Last Activity <SortHandler sorts={{ asc: this.dateAsc, desc: this.dateDesc }} callback={(e) => this.setState(Object.assign({}, this.state, { sortMethod: e }))} /></th>
                            <th>Running </th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Button variant="light" className="add-users-button"><Link to="/add-users">Add Users</Link></Button></td>
                                <td></td>
                                <td></td>
                                <td>
                                    {/* Start all servers */}
                                    <Button variant="primary" className="start-all" onClick={
                                        () => {
                                            Promise.all(startAll(user_data.map(e => e.name)))
                                            .then(res => {
                                                updateUsers()
                                                    .then(data => data.json())
                                                    .then(data => {
                                                        dispatchUserUpdate(data)
                                                    })
                                                    .catch(err => console.log(err))
                                                return res
                                            })
                                            .catch(err => console.log(err))
                                        }
                                    }>Start All</Button> 
                                    <span>   </span>
                                    {/* Stop all servers */}
                                    <Button variant="danger" className="stop-all" onClick={
                                        () => {
                                            Promise.all(stopAll(user_data.map(e => e.name)))
                                            .then(res => {
                                                updateUsers()
                                                    .then(data => data.json())
                                                    .then(data => {
                                                        dispatchUserUpdate(data)
                                                    })
                                                    .catch(err => console.log(err))
                                                return res
                                            })
                                            .catch(err => console.log(err))
                                        }
                                    }>Stop All</Button>
                                </td>
                                <td>
                                    {/* Shutdown Jupyterhub */}
                                    <Button variant="danger" className="shutdown-button" onClick={shutdownHub}>Shutdown Hub</Button>
                                </td>
                            </tr>
                            {user_data.map((e, i) => (
                                <tr key={i + "row"} className="user-row">
                                <td>{e.name}</td>
                                <td>{e.admin ? "admin" : "" }</td>
                                <td>{e.last_activity ? timeSince(e.last_activity) : "Never" }</td>
                                <td>{e.server != null
                                    // Stop Single-user server
                                    ? <button className="btn btn-danger btn-xs stop-button" onClick=
                                        {
                                            () => stopServer(e.name)
                                                    .then(res => {
                                                        updateUsers()
                                                            .then(data => data.json())
                                                            .then(data => {
                                                                dispatchUserUpdate(data)
                                                            })
                                                        return res
                                                    })
                                                    .catch(err => console.log(err))
                                        }
                                      >Stop Server</button>

                                    // Start Single-user server
                                    : <button className="btn btn-primary btn-xs start-button" onClick=
                                        {
                                            () => startServer(e.name)
                                                    .then(res => {
                                                        updateUsers()
                                                            .then(data => data.json())
                                                            .then(data => {
                                                                dispatchUserUpdate(data)
                                                            })
                                                        return res
                                                    })
                                                    .catch(err => console.log(err))
                                        }
                                      >Start Server</button>
                                }</td>
                                <td>
                                    {/* Edit User */}
                                    <button className="btn btn-primary btn-xs" style={{marginRight: 20}} onClick={
                                        () => this.props.history.push({
                                            pathname: "/edit-user",
                                            state: {
                                                username: e.name,
                                                has_admin: e.admin
                                            }
                                        })
                                    }>edit user</button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

class SortHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            direction: undefined
        }
    }

    render() {
        let {
            sorts,
            callback
        } = this.props;

        return (
            <div className="sort-icon" onClick={
                () => {
                    if( !this.state.direction ) {
                        callback(sorts.desc)
                        this.setState({ direction: "desc" })
                    } else if( this.state.direction == "asc" ) {
                        callback(sorts.desc)
                        this.setState({ direction: "desc" })
                    } else {
                        callback(sorts.asc)
                        this.setState({ direction: "asc" })
                    }
                }
            }>
                {
                    !this.state.direction ? <FaSort /> : (this.state.direction == "asc" ? <FaSortDown /> : <FaSortUp />)
                }
            </div>
        )
    }
}