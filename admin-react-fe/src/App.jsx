import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HubPage from './components/HubPage/HubPage'
import ServerDashboard from './domain/ServerDashboard/ServerDashboard'

class App extends Component {
    render() {
        return (
            <div>
                <HubPage contains={<ServerDashboard />} navbarLinks={["Home", "Token", "Admin"]} username="nathanbarber" jupyterhubVersion="Jupyterhub v1.2.1"/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("admin-fe-hook")
)