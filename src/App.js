import React from "react";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Todos</h1>

      <TodoList />
    </div>
  );
}

export default App;
