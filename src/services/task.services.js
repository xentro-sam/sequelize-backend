const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const HTTPError = require('../utils/errors/HTTPError');

const createTask = async (task) => {
  if(Array.isArray(task)) {
    throw new HTTPError('Input is not in JSON', 400);
  }
  const uuid = uuidv4();
  const newTask = {
    ...task,
    uuid,
    isComplete: false
  }
  return await db.Tasks.create(newTask);
};

const getTasks = async () => {
  const tasks = await db.Tasks.findAll();
  if (!tasks.length) {
    throw new HTTPError('No tasks found', 404);
  }
  return tasks;
};

const getTask = async (uuid) => {
  const task = await db.Tasks.findAll({ where: { uuid } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${uuid} was not found`, 404);
  }
  return task;
};

const deleteTask = async (uuid) => {
  const rows = await db.Tasks.destroy({ where: { uuid } });
  if (!rows) {
    throw new HTTPError(`Task with id ${uuid} was not found`, 404);
  }
  return 'Task deleted successfully';
};

const completeTask = async (uuid) => {
  const task = await db.Tasks.findAll({ where: { uuid } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${uuid} was not found`, 404);
  }
  await db.Tasks.update({ isComplete: true }, { where: { uuid } });
  task[0].isComplete = true;
  return task[0];
};

const updateTask = async (uuid, data) => {
  let task = await db.Tasks.findAll({ where: { uuid } });
  if (!task.length) {
    throw new HTTPError(`Task with id ${uuid} was not found`, 404);
  }
  task = {...task[0], ...data}
  await db.Tasks.update(task, { where: { uuid } });
  task = await db.Tasks.findOne({ where: { uuid } });
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