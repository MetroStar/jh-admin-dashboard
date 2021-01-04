import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withProps
} from 'recompose'
import { Link } from 'react-router-dom'
import { jhapiRequest } from '../../util/jhapiUtil'

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updated_username: null,
            admin: null
        }
    }

    render() {

        if( this.props.location.state == undefined ) return this.props.history.push("/")

        var {
            username,
            has_admin
        } = this.props.location.state

        var {
            editUser,
            deleteUser,
            refreshUserData,
            dispatch
        } = this.props


        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading"><h4>Editing user {username}</h4></div>
                                <div className="panel-body">
                                    <form>
                                        <div className="form-group">
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="updated username" onKeyDown={
                                                (e) => {
                                                    this.setState(Object.assign({}, this.state, { updated_username: e.target.value }))
                                                }
                                            }></textarea>     
                                            <br></br>                                       
                                            <input className="form-check-input" checked={ has_admin ? true : false } type="checkbox" value="" id="admin-check" onChange={
                                                e => this.setState(Object.assign({}, this.state, { admin: e.target.checked }))
                                            }/>
                                            <span> </span>
                                            <label className="form-check-label">
                                                Admin
                                            </label>
                                            <br></br>
                                            <button className="btn btn-danger btn-sm" onClick={
                                                () => {
                                                    deleteUser(username)
                                                    .then((data) => {
                                                        console.log(data)
                                                        this.props.history.push("/")
                                                        refreshUserData()
                                                    })
                                                }
                                            }>Delete user</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    <button className="btn btn-light"><Link to="/">Back</Link></button>
                                    <span> </span>
                                    <button className="btn btn-primary" onClick={
                                        () => {
                                            let updated_username = this.state.updated_username,
                                                admin = this.state.admin

                                            console.log(updated_username, admin)
                                            if( updated_username == null && admin == null ) return
                                            if( updated_username.length > 2 && /[!@#$%^&*(),.?":{}|<>]/g.test(updated_username) == false ) {
                                                editUser(username, updated_username != null ? updated_username : username, admin != null ? admin : has_admin)
                                                .then((data) => {
                                                    console.log(data)
                                                    this.props.history.push("/")
                                                    refreshUserData()
                                                })
                                            } else {
                                                alert("Cannot update " + updated_username + " for either containing special characters or being too short.")
                                            }
                                        }
                                    }>Apply</button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </>                
        )
    }
}

const withUserAPI = withProps( props => ({
    editUser: (username, updated_username, admin) => jhapiRequest("/users/" + username, "PATCH", { name: updated_username, admin }),
    deleteUser: username => jhapiRequest("/users/" + username, "DELETE"),
    refreshUserData: () => jhapiRequest("/users", "GET").then(data => data.json()).then(data => props.dispatch({ type: "USER_DATA", value: data }))
}))

export default compose(
    connect(),
    withUserAPI
)(EditUser)