const express = require('express');
const app = express();
const bp = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5500;
const todo_routes = express.Router();

let todo = require('./todo.model'); 

app.use(cors());
app.use(bp.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('Соединение установлено!');
});

todo_routes.route('/').get(function(req, res) {
    todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todos);
        }
    });
});

todo_routes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    todo.findById(id, function(err, _todo) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(_todo);
        }
        
    });
});

todo_routes.route('/add').post(function(req, res) {
    let td = new todo(req.body);
    td.save()
      .then(todo => {
            res.status(200).json({'todo': 'заметка добавлена успешно!'});
      })
      .catch(err => {
          res.status(400).send('Ошибка при добавлении.');
      });
});

todo_routes.route('/update/:id').post(function(req, res) {
    todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('заметка не найдена');
        else 
        {
            todo.todo_description = req.body.todo_description;
            todo.todo_completed = req.todo_completed;

            todo.save().then(todo => {
                res.json('Заметка обновлена');
            })
            .catch(err => {
                res.status(400).send('Редактирование невозможно');
            });
        }
    });
});

todo_routes.route('/delete/:id').delete(function(req, res) {
    todo.findByIdAndRemove(req.params.id, function(err, todo) {
      if (err) {
        console.log(err);
      } 
      else {
        res.status(200).json('Заметка удалена')
      }
    })
  })

app.use('/todos', todo_routes);

app.listen(PORT, function(){
    console.log(`Сервер запущен на порту ${PORT}`);
})
