const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const HTTPError = require('../utils/errors/HTTPError');

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
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  return task;
};

const deleteTask = async (id) => {
  const rows = await db.Task.destroy({ where: { id } });
  if (!rows) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  return 'Task deleted successfully';
};

const completeTask = async (id) => {
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  await db.Task.update({ isComplete: true }, { where: { id } });
  task[0].isComplete = true;
  return task[0];
};

const updateTask = async (id, data) => {
  let task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${id} was not found`, 404);
  }
  task = {...task[0], ...data}
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