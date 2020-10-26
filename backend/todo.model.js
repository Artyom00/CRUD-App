const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    todo_description: {
        type: String
    }
    
});

module.exports = mongoose.model('Todo', todoSchema);
