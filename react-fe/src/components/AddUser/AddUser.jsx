import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withProps
} from 'recompose'
import { Link } from 'react-router-dom'
import { jhapiRequest } from '../../util/jhapiUtil'
import './add-user.css'

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            admin: false
        }
    }

    render() {
        var {
            addUsers,
            refreshUserData,
            dispatch
        } = this.props

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading"><h4>Add Users</h4></div>
                                <div className="panel-body">
                                    <form>
                                        <div className="form-group">
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="usernames separated by line" onBlur={
                                                (e) => {
                                                    let split_users = e.target.value.split("\n")
                                                    console.log(split_users)
                                                    this.setState(Object.assign({}, this.state, { users: split_users }))
                                                }
                                            }></textarea>     
                                            <br></br>                                       
                                            <input className="form-check-input" type="checkbox" value="" id="admin-check" onChange={
                                                e => this.setState(Object.assign({}, this.state, { admin: e.target.checked }))
                                            }/>
                                            <span> </span>
                                            <label className="form-check-label">
                                                Admin
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    <button className="btn btn-light"><Link to="/">Back</Link></button>
                                    <span> </span>
                                    <button className="btn btn-primary" onClick={
                                        () => {
                                            let filtered_users = this.state.users.filter(e => e.length > 2 && /[!@#$%^&*(),.?":{}|<>]/g.test(e) == false)
                                            if( filtered_users.length < this.state.users.length ) {
                                                let removed_users = this.state.users.filter(e => !(filtered_users.includes(e)))
                                                alert("Removed " + JSON.stringify(removed_users) + " for either containing special characters or being too short.")
                                            }

                                            console.log(filtered_users, this.state.admin)

                                            addUsers(filtered_users, this.state.admin)
                                            .then(data => console.log(data))
                                            .then(() => refreshUserData())
                                            .then(() => this.props.history.push("/"))
                                        }
                                    }>Add Users</button>
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
    addUsers: (usernames, admin) => jhapiRequest("/users", "POST", { usernames, admin }),
    refreshUserData: () => jhapiRequest("/users", "GET").then(data => data.json()).then(data => props.dispatch({ type: "USER_DATA", value: data }))
}))

export default compose(
    connect(),
    withUserAPI
)(AddUser)