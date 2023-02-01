const taskService = require('../services/task.services');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200);
    res.json(tasks);
  }
  catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTask(id);
    res.status(200);
    res.json(task);
  }
  catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const taskData = req.body;
  try {
    const task = await taskService.createTask(taskData);
    res.status(201);
    res.json(task);

  } catch (error) {
    res.status(400);
    res.json({ message: 'Input is not in JSON' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    let status = await taskService.deleteTask(id);
    res.status(200);
    res.json({ message: status });
  }
  catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.completeTask(id);
    res.status(200);
    res.json(task);
  }
  catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskData = req.body;
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(id, taskData);
    res.status(200);
    res.json(updatedTask);
  }
  catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  completeTask,
  updateTask
};