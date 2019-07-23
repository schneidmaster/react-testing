import React from "react";
import classnames from "classnames";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { patchJSON } from "./api";
import "./Todo.css";

const Todo = ({ todo, users, updateTodo }) => {
  const assignee = users.find((user) => user.id === todo.userId);

  const updateCheckbox = async (status) => {
    const updatedTodo = await patchJSON(`/todos/${todo.id}`, {
      status
    });
    updateTodo(updatedTodo);
  };

  return (
    <div className="todo">
      <h2 className="todo-title">
        {todo.status === "complete" ? (
          <FaRegCheckSquare
            onClick={() => updateCheckbox("incomplete")}
            role="checkbox"
            aria-checked="true"
          />
        ) : (
          <FaRegSquare
            onClick={() => updateCheckbox("complete")}
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
};

export default Todo;
