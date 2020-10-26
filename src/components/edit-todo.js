import React, {Component} from 'react';
import axios from 'axios'

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: ''
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:5500/todos/'+this.props.match.params.id)
             .then(response => {
                 this.setState({
                     todo_description: response.data.todo_description
                 })
             })
             .catch(function(error){
                 console.log(error)
             })
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
       e.preventDefault();
       const obj = {
           todo_description: this.state.todo_description
       };
       axios.post('http://localhost:5500/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Редактировать запись</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Описание:</label>
                        <input type='text'
                            className='form-control'
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}/>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Обновить' className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}