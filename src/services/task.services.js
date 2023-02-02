const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const db = require('../models');
const HTTPError = require('../utils/errors/HTTPError');

const schema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(30).required(),
  isComplete: Joi.boolean().required()
});

const validateId = Joi.object({
  id: Joi.string().uuid().required()
});

const createTask = async (task) => {
  if(Array.isArray(task)) {
    throw new HTTPError('Input is not in JSON', 400);
  }
  const id = uuidv4();
  const newTask = {
    ...task,
    id,
    isComplete: false
  }
  await schema.validateAsync(newTask)
  return await db.Task.create(newTask);
};

const getTasks = async () => {
  const tasks = await db.Task.findAll();
  if (!tasks.length) {
    throw new HTTPError('No tasks found', 404);
  }
  return tasks;
};

const getTask = async (id) => {
  await validateId.validateAsync({ id });
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  return task;
};

const deleteTask = async (id) => {
  await validateId.validateAsync({ id });
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  await db.Task.destroy({ where: { id: id } });
  return 'Task deleted successfully';
};

const completeTask = async (id) => {
  await validateId.validateAsync({ id });
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  await db.Task.update({ isComplete: true }, { where: { id } });
  task.isComplete = true;
  return task;
};

const updateTask = async (id, data) => { 
  await validateId.validateAsync({ id });
  let task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  task = {...task[0], ...data}
  await schema.validateAsync(task);
  await db.Task.update(task, { where: { id } });
  task = await db.Task.findOne({ where: { id } });
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  completeTask,
  updateTask
};