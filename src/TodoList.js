import React, { Component } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import { getJSON } from "./api";

export default class TodoList extends Component {
  state = {
    loaded: false,
    todos: [],
    users: []
  };

  async componentDidMount() {
    const [todos, users] = await Promise.all([
      getJSON("/todos"),
      getJSON("/users")
    ]);

    this.setState({ loaded: true, todos, users });
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  updateTodo = (updatedTodo) => {
    const todoIdx = this.state.todos.findIndex(
      (todo) => todo.id === updatedTodo.id
    );
    const newTodos = [...this.state.todos];
    newTodos[todoIdx] = updatedTodo;
    this.setState({ todos: newTodos });
  };

  render() {
    const { loaded, todos, users } = this.state;

    if (!loaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              users={users}
              updateTodo={this.updateTodo}
            />
          ))}

          <AddTodo users={users} addTodo={this.addTodo} />
        </>
      );
    }
  }
}
