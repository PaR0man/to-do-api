const db = require('../models');
const Todo = db.todos;

//get all todo items
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title
    ? {
        title: { $regex: new RegExp(title), $options: 'i' },
      }
    : {};

  Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retriving todos.',
      });
    });
};

//create a todo item
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const todoItem = new Todo({
    title: req.body.title,
    status: req.body.status ? req.body.status : false,
  });

  todoItem
    .save(todoItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Todo item',
      });
    });
};

//Check todo item
exports.check = (req, res) => {
  const id = req.params.id;

  Todo.findById(id, (err, todo) => {
    if (err) {
      return;
    }

    todo.status = !todo.status;

    todo.save((err, data) => {
      if (data) {
        return res.send(data);
      }
      res.status(500).send({
        message:
          err.message || 'Some error occurred while checking the Todo item',
      });
    });
  });
};

//update title of todo item
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Title to update can not be empty.',
    });
  }
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      console.log('data = ',data);
      if (!data) {
        res.status(404).send({
          message: `Can not update Todo item with id = ${id}.`,
        });
      } else res.send(req.body);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error updating Todo item with id = ' + id,
      });
    });
};

//delete a todo item
exports.removeOne = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not delete Todo item with id = ${id}.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send({
        message: err.message || 'Could not delete Todo item with if = ' + id,
      });
    });
};

//delete all todo items
exports.deleteAll = (req, res) => {
  Todo.deleteMany({ status: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while removing completed todo items.',
      });
    });
};
