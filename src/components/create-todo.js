import React, {Component} from 'react';
import axios from 'axios';


export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('Form submitted');
        console.log(`Todo description: ${this.state.todo_description}`);
       

        const new_todo = {
            todo_description: this.state.todo_description
            
        }

        axios.post('http://localhost:5500/todos/add', new_todo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: ''
            
        })

        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Создать новую заметку</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Описание: </label>
                        <input type='text'
                                className='form-control'
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}/> 
                    </div>

                    <div className='form-group'>
                        <input type='submit'
                               value='Создать'
                               className='btn btn-primary'/>
                    </div>
                </form>
            </div>

          
        )
    }
}