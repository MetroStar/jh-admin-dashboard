import React, { Component } from 'react'
import {
    Container,
    Button
} from 'react-bootstrap'
import {
    FiLogOut
} from 'react-icons/fi'
import "./hub-page.css"
import logo from './jupyterhub.png'

export default class HubPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navbarLinks, username, contains, jupyterhubVersion } = this.props
        if( !username || !navbarLinks || !contains ) return <div></div>

        return (
            <div>
                <Container fluid className="navigation">
                    <img src={logo} alt="" className="logo"/>
                    {navbarLinks.map(e => <span className="navbar-text">{e}</span>)}
                    <div className="user-actions">
                        <span className="username navbar-text">{username}</span>
                        <Button size="sm" variant="light" className="logout-button"><FiLogOut className="logout-icon"/> Logout</Button>
                    </div>
                </Container>
                { contains }
                <Container fluid className="footer">
                    <div className="footer-text">{jupyterhubVersion ? jupyterhubVersion : "" }</div>
                </Container>
            </div>
        )
    }
}