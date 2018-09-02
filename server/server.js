var mongoose = require('mongoose');

//Promise library
mongoose.Promise = global.Promise;
//Connect to debug
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Todo Model
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: "Cook Dinner"
});

newTodo.save().then((doc) =>{
  console.log('Saved todo', doc)
}, (e) => {
  console.log('Unable to save todo')
});
