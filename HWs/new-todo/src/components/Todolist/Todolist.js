import React from "react";
import { deleteTodo, getTodos, postTodo, updateTodo } from "../../api/TodoApi";
import Todoitem from "./Todoitem/Todoitem";
import "./Todolist.css";
import { withTodos } from "../../hoc/withTodos";
import { Button, Input, Space, List } from 'antd';

class Todolist extends React.Component {
  state = {
    inputValue: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      content: this.state.inputValue,
      completed: false,
    };
    postTodo(newTodo).then((todo) => {
      this.props.onUpdate([...this.props.todos, todo]);
      this.setState({ inputValue: "" });
    });
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleDelete = (id) => {
    deleteTodo(id).then(() => {
      this.props.onUpdate(this.props.todos.filter((todo) => id !== todo.id));
    });
  };

  handleUpdate = (newTodo) => {
    updateTodo({ ...newTodo }).then((res) => {
      console.log('updated');
      this.props.onUpdate(
        this.props.todos.map((item) => {
          if (item.id === res.id) {
            return { ...res };
          } else {
            return item;
          }
        })
      );
    });
  };

  render() {
    const { todos } = this.props;
    const pendingTodos = todos.filter((todo) => todo.completed === false);
    const completedTodos = todos.filter((todo) => todo.completed === true);

    return (
      <div className="todolist">
        {/* two way binding */}
        <Space.Compact>
          <Input
            className="todo-input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <Button className="submit-btn" onClick={this.handleSubmit} type="primary">
            submit
          </Button>
        </Space.Compact>

        <div className="todolist-frame">
          <List
            className="todolist-list"
            header={<div>Pending</div>}
            bordered
            dataSource={pendingTodos}
            renderItem={(todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            )}
          />

          <List
            className="todolist-list"
            header={<div>Completed</div>}
            bordered
            dataSource={completedTodos}
            renderItem={(todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            )}
          />
          {/* <div className="todolist-list">
            <p>Pending</p>
            {pendingTodos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            ))}
          </div> */}

          {/* <div className="todolist-list">
            <p>Completed</p>
            {completedTodos.map((todo) => (
              <Todoitem
                key={todo.id}
                todo={todo}
                onDelete={this.handleDelete}
                onUpdate={this.handleUpdate}
              />
            ))}
          </div> */}
        </div>
      </div>
    );
  }
}

export default withTodos(Todolist);