import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { AddUser } from './AddUser.pre'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("AddUser Component: ", () => {
    it("Updates state.users on textbox blur", () => {
        let component = shallow(<AddUser />),
            textarea = component.find("textarea")
        textarea.simulate("blur", { target: { value: "foo"} })
        expect(JSON.stringify(component.state("users"))).toBe('["foo"]')
    })

    it("Can separate newline spaced names into an array", () => {
        let component = shallow(<AddUser />),
            textarea = component.find("textarea")
        textarea.simulate("blur", { target: { value: "foo\nbar\nsoforth" } })
        expect(JSON.stringify(component.state("users"))).toBe('["foo","bar","soforth"]')
    })

    it("Deliminates names with special / less than 3 characters", () => {
        let component = shallow(<AddUser addUsers={(a, b) => new Promise(resolve => resolve())} userDelimitationEvent={() => {}}/>),
            textarea = component.find("textarea"),
            submit = component.find("#submit")
        textarea.simulate("blur", { target: { value: "foo\nbar\nb%%%\n$andy\nhalfdecent" } })
        submit.simulate("click")
        expect(JSON.stringify(component.state("users"))).toBe('["foo","bar","halfdecent"]')
    })

    it("Recognizes admin user selection", () => {
        let component = shallow(<AddUser addUsers={(a, b) => new Promise(resolve => resolve())} userDelimitationEvent={() => {}}/>),
            admin = component.find("#admin-check"),
            submit = component.find("#submit")
        admin.simulate("change", { target: { checked: true } })
        expect(component.state("admin")).toBe(true)       
    })
})