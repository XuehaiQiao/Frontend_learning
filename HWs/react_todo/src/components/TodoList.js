import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleAddTodo = () => {
    const { todos, newTodo } = this.state;
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, newTodo];
      this.setState({ todos: updatedTodos, newTodo: '' });
    }
  }

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    this.setState({ todos: updatedTodos });
  }

  render() {
    const { todos, newTodo } = this.state;

    return (
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={this.handleChange}
          placeholder="Enter a new todo"
        />
        <button onClick={this.handleAddTodo}>Add Todo</button>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => this.handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;