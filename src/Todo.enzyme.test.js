import React from "react";
import { shallow } from "enzyme";
import Todo from "./Todo";

// Mock the API so we don't make any real network calls;
jest.mock("./api");
import { patchJSON } from "./api";

describe("Todo", () => {
  beforeEach(() => {
    // Clear out our mock between each test, so that calls
    // from one test don't show up in another test. Don't
    // worry about this just yet -- we'll get to using the
    // mock farther down in this file.
    patchJSON.mockClear();
  });

  // Snapshot tests with Enzyme. Shallow-render the
  // component and snapshot it -- the first time the
  // test runs, it will create a snapshot file in
  // __snapshots__/Todo.enzyme.test.js.snap, and then
  // subsequent runs will compare against that snapshot.
  // When the component markup legitimately changes, you
  // can run the test command with `-u` to update the
  // snapshots.
  //
  // Word of caution: don't let snapshot tests become a
  // replacement for testing functionality. It's easy to
  // write a test suite with 10 snapshots for all the possible
  // component states, but then the snapshots will break
  // every time you make an intentional change and you have
  // to update them all -- and it's easy to casually do this
  // without inspecting all the changes. It's fine to use a
  // few snapshots to ensure rendering doesn't change
  // unexpectedly, but you should have more specific tests
  // asserting the core functionality (more on that below).
  it("renders correctly when incomplete", () => {
    const todo = {
      id: 1,
      title: "Build a racecar 🏎",
      status: "incomplete",
      userId: 1
    };
    const users = [
      {
        id: 1,
        name: "Joe User"
      }
    ];
    const wrapper = shallow(<Todo todo={todo} users={users} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when complete", () => {
    const todo = {
      id: 1,
      title: "Build a racecar 🏎",
      status: "complete",
      userId: 1
    };
    const users = [
      {
        id: 1,
        name: "Joe User"
      }
    ];
    const wrapper = shallow(<Todo todo={todo} users={users} />);
    expect(wrapper).toMatchSnapshot();
  });

  // Using Enzyme finders for a more specific test around which
  // icon renders.
  it("renders empty checkbox when incomplete", () => {
    const todo = {
      id: 1,
      title: "Build a racecar 🏎",
      status: "incomplete",
      userId: 1
    };
    const users = [
      {
        id: 1,
        name: "Joe User"
      }
    ];
    const wrapper = shallow(<Todo todo={todo} users={users} />);
    expect(wrapper.find("FaRegSquare")).toHaveLength(1);
  });

  it("renders checked checkbox when complete", () => {
    const todo = {
      id: 1,
      title: "Build a racecar 🏎",
      status: "complete",
      userId: 1
    };
    const users = [
      {
        id: 1,
        name: "Joe User"
      }
    ];
    const wrapper = shallow(<Todo todo={todo} users={users} />);
    expect(wrapper.find("FaRegCheckSquare")).toHaveLength(1);
  });

  // Let's test out the functionality when we click the checkbox.
  it("can be checked when incomplete", async () => {
    const todo = {
      id: 1,
      title: "Build a racecar 🏎",
      status: "incomplete",
      userId: 1
    };
    const users = [
      {
        id: 1,
        name: "Joe User"
      }
    ];
    const updateTodo = jest.fn();
    const wrapper = shallow(
      <Todo todo={todo} users={users} updateTodo={updateTodo} />
    );

    // Let's make patchJSON return an updated todo with a
    // complete status.
    const updatedTodo = { ...todo, status: "complete" };
    patchJSON.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(updatedTodo);
      });
    });

    // Note this test is `async`, and `await`s its change --
    // that lets the async method resolve.
    //
    // Enzyme shallow wrappers have a `.find` method which is
    // very flexible -- it can take a component name or a
    // DOM selector. Enzyme also has more finder methods which
    // I'll omit for brevity but are pretty well documented.
    await wrapper.find("FaRegSquare").simulate("click");

    // The component should have made an API call to update
    // the server, and then invoked updateTodo so the parent
    // knows to update its data.
    expect(patchJSON).toBeCalledWith(`/todos/1`, {
      status: "complete"
    });
    expect(updateTodo).toBeCalledWith(updatedTodo);
  });

  // Here's a thing you *can* do -- but never, ever should.
  it("can be checked when method is invoked", async () => {
    const todo = {
      id: 1,
      title: "Build a racecar 🏎",
      status: "incomplete",
      userId: 1
    };
    const users = [
      {
        id: 1,
        name: "Joe User"
      }
    ];
    const updateTodo = jest.fn();
    const wrapper = shallow(
      <Todo todo={todo} users={users} updateTodo={updateTodo} />
    );

    // Let's make patchJSON return an updated todo with a
    // complete status.
    const updatedTodo = { ...todo, status: "complete" };
    patchJSON.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(updatedTodo);
      });
    });

    // Invoke the method to complete the todo.
    await wrapper.instance().complete();

    // Same as above.
    expect(patchJSON).toBeCalledWith(`/todos/1`, {
      status: "complete"
    });
    expect(updateTodo).toBeCalledWith(updatedTodo);
  });

  // Why shouldn't you do this? Because you are breaking
  // the "4th wall" and testing the implementation details
  // of your component. Tests should validate the component'
  // external behavior, from the perspective of a user or
  // maybe another component.
  //
  // Imagine we refactor this component to use React hooks
  // (aside: guess what's next in the talk!). Externally,
  // the component should behave identically to how it did
  // before -- but this test will break because the component
  // no longer has an instance or a `complete` method. The
  // other tests will not break* because they interact with
  // the interface more like a user would.
  //
  // * actually they will, because Enzyme does not support
  // hooks yet. But the principle -- "don't test implementation
  // details" -- applies no matter what library you use; it
  // will make your tests much less brittle and much more
  // effective at helping guide you through refactors.
});
