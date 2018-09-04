const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');

const {
  app
} = require('./../server');
const {
  Todo
} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];


beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

//Post todo Test
describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }

        Todo.find({
          text
        }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

//Get todo Test
describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 and error if todo not found', (done) => {
    request(app)
      .get('/todos/5b8c35843de8a814606195a7')
      .expect(404)
      .expect((res) => {
        expect(res.body.err).toBe('TODO_NOT_FOUND');
      })
      .end(done);
  });

  it('Should return 404 and error for invalid ID', (done) => {
    request(app)
      .get('/todos/5b8c35843de')
      .expect(404)
      .expect((res) => {
        expect(res.body.err).toBe('INVALID_ID');
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });


  });

  it('Should return 404 and error if todo not found', (done) => {
    request(app)
      .delete('/todos/5b8c35843de8a814606195a7')
      .expect(404)
      .expect((res) => {
        expect(res.body.err).toBe('TODO_NOT_FOUND');
      })
      .end(done);
  });

  it('Should return 404 and error for invalid ID', (done) => {
    request(app)
      .delete('/todos/5b8c35843de')
      .expect(404)
      .expect((res) => {
        expect(res.body.err).toBe('INVALID_ID');
      })
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('Should update todo', (done) => {
    //grab id of first item
    var hexId = todos[0]._id.toHexString();

    request(app)
    .patch(`/todos/${hexId}`)
    //update text, set completed true
    .send({
      completed: true,
      text: "Updated text"
    })
    //200
    .expect(200)
    //res body has text = to text sent inspect
    .expect((res) => {
      expect(res.body.todo.text).toBe("Updated text");
      expect(res.body.todo.completed).toBeTruthy();
      expect(typeof res.body.todo.completedAt).toBe('number');
    }).end(done);

  });

  it('Should clear completedAt when todo is set to not completed', (done) => {
    //grab id of second todo item
    var hexId = todos[1]._id.toHexString();
    //update text, set completed to false
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: false,
      text: "Updated text"
    })
    //200
    .expect(200)
    //text is changed
    //completedAt is null .toNotExist
    .expect((res) => {
      expect(res.body.todo.text).toBe("Updated text");
      expect(res.body.todo.completed).toBeFalsy();
      expect(res.body.todo.completedAt).toBeFalsy();
    }).end(done);
  });
});
