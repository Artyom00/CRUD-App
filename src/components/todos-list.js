import React, {Component} from 'react';
import axios from 'axios';
import ShowTodoList from './ShowTodoList';


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
            return <ShowTodoList todo={currentTodo} key={i} />;
        });
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
        );
    }
}

