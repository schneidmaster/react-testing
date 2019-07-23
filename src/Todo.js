import React, { Component } from "react";
import classnames from "classnames";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { patchJSON } from "./api";
import "./Todo.css";

export default class Todo extends Component {
  complete = async () => {
    const todo = await patchJSON(`/todos/${this.props.todo.id}`, {
      status: "complete"
    });
    this.props.updateTodo(todo);
  };

  uncomplete = async () => {
    const todo = await patchJSON(`/todos/${this.props.todo.id}`, {
      status: "incomplete"
    });
    this.props.updateTodo(todo);
  };

  render() {
    const { todo, users } = this.props;

    const assignee = users.find((user) => user.id === todo.userId);

    return (
      <div className="todo">
        <h2 className="todo-title">
          {todo.status === "complete" ? (
            <FaRegCheckSquare
              onClick={this.uncomplete}
              role="checkbox"
              aria-checked="true"
            />
          ) : (
            <FaRegSquare
              onClick={this.complete}
              role="checkbox"
              aria-checked="false"
            />
          )}{" "}
          <span
            className={classnames({
              "todo-title-completed": todo.status === "complete"
            })}
          >
            {todo.title}
          </span>
        </h2>
        <p className="todo-assignee">
          <em>Assigned to:</em> {assignee.name}
        </p>
      </div>
    );
  }
}
