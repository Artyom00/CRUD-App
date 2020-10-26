import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import edit_icon from './edit_icon.png';
import delete_icon from './delete_icon.png';
import axios from 'axios';


export default class ShowTodoList extends Component {

    constructor(props) {
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    deleteTodo() {
        axios.delete('http://localhost:5500/todos/delete/' + this.props.todo._id)
            .then((res) => {
                console.log('Заметка успешно удалена!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
        <td>{this.props.todo.todo_description}</td>
        <td>
            <Link to={'/edit/' + this.props.todo._id}>
                <img src={edit_icon} width='40' height='40' alt=''/>
            </Link>
        </td>
        <td>
            <Button onClick={this.deleteTodo} variant="outline-danger" size="sm"><img src={delete_icon} width='40' height='40' alt=''/></Button>
        </td>
    </tr>
        );
    }
}