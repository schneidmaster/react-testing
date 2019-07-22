import React, { Component } from "react";
import { postJSON } from "./api";
import "./AddTodo.css";

export default class AddTodo extends Component {
  state = {
    adding: false,
    title: "",
    userId: ""
  };

  startAdding = () => {
    this.setState({ adding: true });
  };

  setTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  setUserId = (e) => {
    this.setState({ userId: e.target.value });
  };

  add = async (e) => {
    e.preventDefault();

    const { title, userId } = this.state;
    const payload = {
      title,
      userId: parseInt(userId, 10),
      status: "incomplete"
    };

    const newTodo = await postJSON("/todos", payload);
    this.props.addTodo(newTodo);
    this.clear();
  };

  clear = () => {
    this.setState({
      adding: false,
      title: "",
      userId: ""
    });
  };

  render() {
    const { users } = this.props;
    const { adding, title, userId } = this.state;

    if (adding) {
      return (
        <form className="add-todo-form" onSubmit={this.add}>
          <fieldset>
            <legend>Add todo</legend>
            <p>
              <label htmlFor="add-todo-title">Title</label>
              <br />
              <input
                id="add-todo-title"
                onChange={this.setTitle}
                value={title}
              />
            </p>

            <p>
              <label htmlFor="add-todo-user">User</label>
              <br />
              <select
                id="add-todo-user"
                onChange={this.setUserId}
                value={userId}
              >
                <option value="">None</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </p>

            <button type="submit" className="add-todo-btn add-todo-btn-primary">
              Add
            </button>

            <button type="reset" className="add-todo-btn" onClick={this.clear}>
              Cancel
            </button>
          </fieldset>
        </form>
      );
    } else {
      return (
        <button
          className="add-todo-btn add-todo-btn-primary"
          onClick={this.startAdding}
        >
          Add todo
        </button>
      );
    }
  }
}
