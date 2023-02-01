const express = require('express');
const Todo = require('../controllers/task.controllers');

const TodoRoutes = express.Router();

TodoRoutes.route('/tasks')
  .get(Todo.getTasks)
  .post(Todo.createTask);

TodoRoutes.route('/tasks/:id')
  .get(Todo.getTask)
  .patch(Todo.completeTask)
  .put(Todo.updateTask)
  .delete(Todo.deleteTask);

module.exports = TodoRoutes;