import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosList from './components/todos-list';
import EditTodo from './components/edit-todo';
import CreateTodo from './components/create-todo';
import Todo_icon from './Todo_icon.png'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
            
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <img src={Todo_icon} width='50' height='50' alt=''/>
              <Link to='/' className='navbar-brand'>Приложение заметок</Link>
              <div className='collpase nav-collapse'>
                <ul className='navbar-nav mr-auto'>
                  <li className='navbar-item'>
                    <Link to='/' className='nav-link'>Заметки</Link>
                  </li>

                  <li className='navbar-item'>
                    <Link to='/create' className='nav-link'>Создать заметку</Link>
                  </li>
                </ul>

              </div>

            </nav>

            <Route path='/' exact component={TodosList} />
            <Route path='/edit/:id' component={EditTodo} />
            <Route path='/create' component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
