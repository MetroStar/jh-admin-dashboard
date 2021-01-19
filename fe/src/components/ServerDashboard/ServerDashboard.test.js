import React from "react";
import Enzyme, { shallow } from "enzyme";
import { ServerDashboard } from "./ServerDashboard.pre";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("ServerDashboard Component: ", () => {
  var serverDashboardJsx = (callbackSpy) => (
    <ServerDashboard
      user_data={JSON.parse(
        '[{"kind":"user","name":"foo","admin":true,"groups":[],"server":"/user/foo/","pending":null,"created":"2020-12-07T18:46:27.112695Z","last_activity":"2020-12-07T21:00:33.336354Z","servers":{"":{"name":"","last_activity":"2020-12-07T20:58:02.437408Z","started":"2020-12-07T20:58:01.508266Z","pending":null,"ready":true,"state":{"pid":28085},"url":"/user/foo/","user_options":{},"progress_url":"/hub/api/users/foo/server/progress"}}},{"kind":"user","name":"bar","admin":false,"groups":[],"server":null,"pending":null,"created":"2020-12-07T18:46:27.115528Z","last_activity":"2020-12-07T20:43:51.013613Z","servers":{}}]'
      )}
      updateUsers={callbackSpy}
      shutdownHub={callbackSpy}
      startServer={callbackSpy}
      stopServer={callbackSpy}
      startAll={callbackSpy}
      stopAll={callbackSpy}
      dispatch={callbackSpy}
    />
  );

  var mockAsync = () =>
    jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve({ k: "v" }) })
      );

  it("Renders users from props.user_data into table", () => {
    let component = shallow(serverDashboardJsx(jest.fn())),
      userRows = component.find(".user-row");
    expect(userRows.length).toBe(2);
  });

  it("Renders correctly the status of a single-user server", () => {
    let component = shallow(serverDashboardJsx(jest.fn())),
      userRows = component.find(".user-row");
    // Renders .stop-button when server is started
    // Should be 1 since user foo is started
    expect(userRows.at(0).find(".stop-button").length).toBe(1);
    // Renders .start-button when server is stopped
    // Should be 1 since user bar is stopped
    expect(userRows.at(1).find(".start-button").length).toBe(1);
  });

  it("Invokes the startServer event on button click", () => {
    let callbackSpy = mockAsync(),
      component = shallow(serverDashboardJsx(callbackSpy)),
      startBtn = component.find(".start-button");
    startBtn.simulate("click");
    expect(callbackSpy).toHaveBeenCalled();
  });

  it("Invokes the stopServer event on button click", () => {
    let callbackSpy = mockAsync(),
      component = shallow(serverDashboardJsx(callbackSpy)),
      stopBtn = component.find(".stop-button");
    stopBtn.simulate("click");
    expect(callbackSpy).toHaveBeenCalled();
  });

  it("Invokes the shutdownHub event on button click", () => {
    let callbackSpy = mockAsync(),
      component = shallow(serverDashboardJsx(callbackSpy)),
      shutdownBtn = component.find(".shutdown-button");
    shutdownBtn.simulate("click");
    expect(callbackSpy).toHaveBeenCalled();
  });

  it("Renders nothing if required data is not available", () => {
    let component = shallow(<ServerDashboard />);
    expect(component.html()).toBe("<div></div>");
  });
});
