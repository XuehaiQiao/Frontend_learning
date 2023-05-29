import React from "react";
import { getTodos } from "../api/TodoApi";

export const withTodos = (Component) => {
  return class NewComponent extends React.Component {
    state = {
      todos: [],
    };


    handleUpdate = (newTodos) => {
      this.setState({
        todos: newTodos
      });
    }

    render() {
      return <Component todos={this.state.todos} onUpdate={this.handleUpdate} />;
    }

    componentDidMount() {
      getTodos().then((todos) => {
        this.setState({
          todos,
        });
      });
    }
  };
};