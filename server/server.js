var mongoose = require('mongoose');

//Promise library
mongoose.Promise = global.Promise;
//Connect to debug
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Todo Model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
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



var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  email: "wahlbergf@msn.com"
});

newUser.save().then((doc) => {
  console.log('Saved User', doc);
}, (e) => {
  console.log('Unable to save new user');
});
