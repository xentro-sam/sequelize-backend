const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const db = require('../models');

const schema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(30).required(),
  isComplete: Joi.boolean().required()
});

const validateId = Joi.object({
  id: Joi.string().uuid().required()
});

const createTask = async (task) => {
  const id = uuidv4();
  const newTask = {
    ...task,
    id,
    isComplete: false
  }
  await schema.validateAsync(newTask);
  return await db.Task.create(newTask);
};

const getTasks = async () => {
  const tasks = await db.Task.findAll();
  if (!tasks.length) {
    throw new Error('No tasks found');
  }
  return tasks;
};

const getTask = async (id) => {
  await validateId.validateAsync({ id });
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  return task;
};

const deleteTask = async (id) => {
  await validateId.validateAsync({ id });
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  await db.Task.destroy({ where: { id: id } });
  return 'Task deleted successfully';
};

const completeTask = async (id) => {
  await validateId.validateAsync({ id });
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  await db.Task.update({ isComplete: true }, { where: { id } });
  task.isComplete = true;
  return task;
};

const updateTask = async (id, data) => { 
  await validateId.validateAsync({ id });
  let task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  task = {...task, ...data}
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