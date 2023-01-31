const express = require('express');
const Todo = require('../controllers/taskControllers');

const TodoRoutes = express.Router();

TodoRoutes.route('/tasks')
  .get(Todo.getTasks)
  .post(Todo.createTask)

TodoRoutes.route('/tasks/:id')
  .get(Todo.getTask)
  .patch(Todo.completeTask)
  .put(Todo.updateTask)
  .delete(Todo.deleteTask);

TodoRoutes.all('*',(req,res) => {
  res.status(400);
  res.json({message: 'Bad Request'});
});

module.exports = TodoRoutes;