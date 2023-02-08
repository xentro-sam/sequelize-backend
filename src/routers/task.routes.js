const express = require('express');
const Todo = require('../controllers/task.controllers');
const { validateId, isSignedIn } = require('../middlewares/task.validations');

const TodoRoutes = express.Router();

TodoRoutes.route('/tasks')
  .get(isSignedIn, Todo.getTasks)
  .post(isSignedIn, Todo.createTask);

TodoRoutes.route('/tasks/:uuid')
  .get(isSignedIn ,validateId, Todo.getTask)
  .patch(isSignedIn, validateId, Todo.completeTask)
  .put(isSignedIn, validateId, Todo.updateTask)
  .delete(isSignedIn ,validateId, Todo.deleteTask);

module.exports = TodoRoutes;