import React from "react";
import "./Todoitem.css";
import { Button, Input, Select, Space, List } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

class Todoitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: { ...props.todo },
      edit: false
    }
  }

  handleContentChange = (e) => {
    this.setState({
      todo: { ...this.state.todo, content: e.target.value }
    });
  };

  handleEditClick = (e) => {
    if (this.state.edit) {
      this.props.onUpdate(this.state.todo);
    }
    this.setState({ edit: !this.state.edit })
  }

  handleStateChange = (e) => {
    this.props.onUpdate({ ...this.props.todo, completed: !this.props.todo.completed })
  }

  render() {
    const { todo, onDelete, onUpdate } = this.props;

    return (
      <List.Item className="todoitem">
        {this.state.edit ?
          <Input className="todoitem-input"
            value={this.state.todo.content}
            onChange={this.handleContentChange} />
          :
          <span className="todoitem-content">{this.state.todo.content}</span>
        }

        <Space wrap>
          <Button type="primary" className="todoitem-button" id="edit" icon={<EditOutlined />} onClick={this.handleEditClick} />
          <Button danger type="primary" className="todoitem-button" id="delete" icon={<DeleteOutlined />} onClick={() => onDelete(this.state.todo.id)} />
          <Button type="primary" className="todoitem-button" id="changeComplete" icon={todo.completed? <ArrowLeftOutlined/> : <ArrowRightOutlined />} onClick={() => onUpdate({ ...todo, completed: !todo.completed })} />
        </Space>
      </List.Item>
    );
  }
}

export default Todoitem;