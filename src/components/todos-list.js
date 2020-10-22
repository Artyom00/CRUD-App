import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import edit_icon from './edit_icon.png';
import Button from 'react-bootstrap/Button';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>
            <Link to={'/edit/' + props.todo._id}>
                <img src={edit_icon} width='40' height='40' alt=''/>
            </Link>
        </td>
        <td><Button size="sm" variant="danger">Удалить</Button></td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5500/todos/')
             .then(response => {
                 this.setState({todos: response.data})
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    componentDidUpdate() {
        axios.get('http://localhost:5500/todos/')
             .then(response => {
                 this.setState({todos: response.data})
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h3>Список задач</h3>
                <table className='table table-striped' style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Описание</th>
                            <th>Изменить</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}