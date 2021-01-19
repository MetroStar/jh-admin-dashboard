import { connect } from 'react-redux'
import {
    compose,
    withProps
} from 'recompose'
import { jhapiRequest } from '../../util/jhapiUtil'
import { EditUser } from './EditUser.pre'

const withUserAPI = withProps( props => ({
    editUser: (username, updated_username, admin) => jhapiRequest('/users/' + username, 'PATCH', { name: updated_username, admin }),
    deleteUser: username => jhapiRequest('/users/' + username, 'DELETE'),
    failRegexEvent: () => alert('Removed ' + JSON.stringify(removed_users) + ' for either containing special characters or being too short.'),
    refreshUserData: () => jhapiRequest('/users', 'GET').then(data => data.json()).then(data => props.dispatch({ type: 'USER_DATA', value: data }))
}))

export default compose(
    connect(),
    withUserAPI
)(EditUser)