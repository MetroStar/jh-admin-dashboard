import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { EditUser } from './EditUser.pre'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("EditUser Component: ", () => {
    
    var editUserJsx = () => (
        <EditUser 
            location={{ state: { username: "foo", has_admin: false } }} 
            deleteUser={() => new Promise(resolve => true)} 
            refreshUserData={() => {}} 
            history={{ push: (a) => {} }} 
            failRegexEvent={() => {}}
        />
    )
    

    it("Updates the state whenever a key is pressed on the textarea", () => {
        let component = shallow(editUserJsx()),
            textarea = component.find("textarea")
        textarea.simulate("keydown", { target: { value: "test" } })
        expect(component.state("updated_username")).toBe("test")
    })

    it("Updates the state whenever the admin box changes", () => {
        let component = shallow(editUserJsx()),
            admin = component.find("#admin-check")
        admin.simulate("change", { target: { checked: true } })
        expect(component.state("admin")).toBe(true)
    })

    it("Delimits the input from the textarea", () => {
        let component = shallow(editUserJsx()),
            submit = component.find("#submit")
        component.setState({ updated_username: "%!@$#&" })
        submit.simulate("click")
        expect(component.state("updated_username")).toBe("")
    })

    it("Calls the delete user function when the button is pressed", () => {
        let component = shallow(editUserJsx()),
            deleteUser = component.find("#delete-user")
        deleteUser.simulate("click")
    })

    it("Submits the edits when the button is pressed", () => {
        let component = shallow(editUserJsx()),
            submit = component.find("#submit")
        submit.simulate("click")
    })
})