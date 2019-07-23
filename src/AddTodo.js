import React, { useState } from "react";
import { postJSON } from "./api";
import "./AddTodo.css";

const AddTodo = ({ users, addTodo }) => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");

  const add = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      userId: parseInt(userId, 10),
      status: "incomplete"
    };

    const newTodo = await postJSON("/todos", payload);
    addTodo(newTodo);
    clear();
  };

  const clear = () => {
    setAdding(false);
    setTitle("");
    setUserId("");
  };

  if (adding) {
    return (
      <form className="add-todo-form" onSubmit={add}>
        <fieldset>
          <legend>Add todo</legend>
          <p>
            <label htmlFor="add-todo-title">Title</label>
            <br />
            <input
              id="add-todo-title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </p>

          <p>
            <label htmlFor="add-todo-user">User</label>
            <br />
            <select
              id="add-todo-user"
              onChange={(e) => setUserId(e.target.value)}
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

          <button type="reset" className="add-todo-btn" onClick={clear}>
            Cancel
          </button>
        </fieldset>
      </form>
    );
  } else {
    return (
      <button
        className="add-todo-btn add-todo-btn-primary"
        onClick={() => setAdding(true)}
      >
        Add todo
      </button>
    );
  }
};

export default AddTodo;
