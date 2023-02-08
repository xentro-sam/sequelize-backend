const express = require('express');
const Todo = require('../controllers/task.controllers');
const { validateId } = require('../middlewares/task.validations');

const TodoRoutes = express.Router();

TodoRoutes.route('/tasks')
  .get(Todo.getTasks)
  .post(Todo.createTask);

TodoRoutes.route('/tasks/:uuid')
  .get(validateId, Todo.getTask)
  .patch(validateId, Todo.completeTask)
  .put(validateId, Todo.updateTask)
  .delete(validateId, Todo.deleteTask);

module.exports = TodoRoutes;