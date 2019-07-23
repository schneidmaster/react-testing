import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
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

  // Snapshot tests. Similar in principle to Enzyme's. One
  // notable difference is that RTL snapshots will only ever
  // contain the final HTML from a component -- which means
  // they're more immune to implementation changes to
  // intermediate components. For example, imagine we renamed
  // the FaRegSquare component -- the Enzyme snapshot would break
  // but the RTL snapshot would not. Which is good, because
  // snapshots should only really care about the final HTML
  // that the user sees, not how we got there.
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
    const { container } = render(<Todo todo={todo} users={users} />);
    expect(container).toMatchSnapshot();
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
    const { container } = render(<Todo todo={todo} users={users} />);
    expect(container).toMatchSnapshot();
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

    // Mock patchJSON, same as before.
    const updatedTodo = { ...todo, status: "complete" };
    patchJSON.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(updatedTodo);
      });
    });

    // RTL exposes a number of finders which you can use to
    // target a particular element in the page. In this case we
    // are using `getByRole` which looks up a component by aria
    // role. RTL's finders have a great side effect: in order to
    // test your component, it almost always has to be accessible,
    // as RTL's finders mirror things that screen readers and
    // similar assistive technology will look for.
    const { getByRole } = render(
      <Todo todo={todo} users={users} updateTodo={updateTodo} />
    );

    // Click on the checkbox.
    fireEvent.click(getByRole("checkbox"));

    // The component should have made an API call to update
    // the server, and then invoked updateTodo so the parent
    // knows to update its data.
    expect(patchJSON).toBeCalledWith(`/todos/1`, {
      status: "complete"
    });

    // RTL also gives you `wait` -- for async effects, RTL's
    // philosophy is that you should wait for them to appear on
    // the screen (as a user would) rather than artificially
    // trying to determine when the code is done.
    await wait(() => expect(updateTodo).toBeCalledWith(updatedTodo));
  });
});
