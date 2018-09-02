const {ObjectID} = require('mongodb');
const {mongoose} =require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

// var id = '5b8c35843de8a814606195a811';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found!');
//   }
//   console.log('TodoById', todo);
// }).catch((e) => console.log(e));


//Challenge
var id = '5b8c23a939a8ca6380be5b7d'
User.findById(id).then((user) => {
  if(!user){
    return console.log('User not found');
  }

  console.log('User By ID', user);
}).catch((e) => console.log(e));
