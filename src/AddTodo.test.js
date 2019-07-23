import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import AddTodo from "./AddTodo";

// Mock the API so we don't make any real network calls;
jest.mock("./api");
import { postJSON } from "./api";

describe("AddTodo", () => {
  beforeEach(() => {
    // Clear out our mock between each test.
    postJSON.mockClear();
  });

  // Snapshot tests.
  it("renders correctly in button state", () => {
    const users = [
      {
        id: 1,
        name: "Jack User"
      },
      {
        id: 2,
        name: "joseph User"
      }
    ];
    const { container } = render(<AddTodo users={users} />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when full form is open", () => {
    const users = [
      {
        id: 1,
        name: "Jack User"
      },
      {
        id: 2,
        name: "joseph User"
      }
    ];
    const { container, getByText } = render(<AddTodo users={users} />);
    const button = getByText("Add todo");
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
  });

  // Test that form fills out and submits successfully.
  // RTL tests like this can straddle the line between
  // unit and integration tests -- they are reliable and
  // fast like unit tests, but the component is actually
  // being exercised in a headless browser so it provides
  // the same security as an integration test.
  it("correctly fills out and submits form", async () => {
    const users = [
      {
        id: 1,
        name: "Jack User"
      },
      {
        id: 2,
        name: "joseph User"
      }
    ];
    const addTodo = jest.fn();
    const { container, getByLabelText, getByText } = render(
      <AddTodo users={users} addTodo={addTodo} />
    );

    // Mock postJSON for creating new todo.
    const newTodo = {
      id: 1,
      title: "Ship the feature 🚀",
      status: "incomplete",
      userId: 1
    };
    postJSON.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(newTodo);
      });
    });

    const startBtn = getByText("Add todo");
    fireEvent.click(startBtn);

    const titleField = getByLabelText("Title");
    fireEvent.change(titleField, { target: { value: "Ship the feature 🚀" } });

    const userField = getByLabelText("User");
    fireEvent.change(userField, { target: { value: 1 } });

    const submitBtn = getByText("Add");
    fireEvent.click(submitBtn);

    expect(postJSON).toBeCalledWith("/todos", {
      title: "Ship the feature 🚀",
      userId: 1,
      status: "incomplete"
    });

    await wait(() => expect(addTodo).toBeCalledWith(newTodo));
  });
});
