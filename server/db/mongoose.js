var mongoose = require('mongoose');

//Promise library
mongoose.Promise = global.Promise;
//Connect to debug
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});


module.exports = {
  mongoose
};
