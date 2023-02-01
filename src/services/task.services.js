const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const createTask = async (task) => {
  const id = uuidv4();
  return await db.Task.create({
    ...task,
    id,
    isComplete: false
  });
};

const getTasks = async () => {
  const tasks = await db.Task.findAll();
  if (!tasks.length) {
    throw new Error('No tasks found');
  }
  return tasks;
};

const getTask = async (id) => {
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  return task;
};

const deleteTask = async (id) => {
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  await db.Task.destroy({ where: { id: id } });
  return 'Task deleted successfully';
};

const completeTask = async (id) => {
  const task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  await db.Task.update({ isComplete: true }, { where: { id } });
  task.isComplete = true;
  return task;
};

const updateTask = async (id, data) => {
  let task = await db.Task.findAll({ where: { id } });
  if (!task.length) {
    throw new Error(`Task with id ${id} was not found`);
  }
  await db.Task.update({ ...data }, { where: { id } });
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