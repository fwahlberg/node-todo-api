var mongoose = require('mongoose');

//Promise library
mongoose.Promise = global.Promise;
//Connect to debug
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = {
  mongoose
};
