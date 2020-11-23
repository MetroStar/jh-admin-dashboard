import React, { Component } from 'react'
import { 
    Table,
    Button
} from 'react-bootstrap'
import "./server-dashboard.css"

export class ServerDashboard extends Component {
    render() {
        var { hasData, servers } = this.props
        // testing
        hasData = true
        servers = [
            {
                "user": "nathanbarber",
                "admin": true,
                "lastActivity": "12:51 02/21",
                "running": true
            },
            {
                "user": "nathanbarber",
                "admin": false,
                "lastActivity": "12:51 02/21",
                "running": false
            }
        ]
        // !testing
        if( !hasData ) return <div></div>

        return (
            <div>
                <div className="server-dashboard-container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>User</th>
                            <th>Admin</th>
                            <th>Last Activity</th>
                            <th>Running</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Button variant="light" className="add-users-button">Add Users</Button></td>
                                <td></td>
                                <td></td>
                                <td><Button variant="primary">Start All</Button> <Button variant="danger">Stop All</Button></td>
                                <td><Button variant="danger">Shutdown Hub</Button></td>
                            </tr>
                            {servers.map(e => (
                                <tr>
                                <td>{e.user}</td>
                                <td>{e.admin ? "admin" : ""}</td>
                                <td>{e.lastActivity}</td>
                                <td>{e.running
                                    ? <Button variant="danger" size="sm">Stop Server</Button>
                                    : <Button variant="primary" size="sm">Start Server</Button>
                                }</td>
                                <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}