const taskService = require('../services/task.services');
const HTTPError = require('../utils/errors/HTTPError');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200);
    res.json(tasks);
  }
  catch (error) {
    if(error instanceof HTTPError) {
      res.status(error.status);
      res.json({ message: error.message });
      return;
    }
    else {
      res.status(500);
      res.json({ message: error.message });
      return;
    }
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
    if(error instanceof HTTPError) {
      res.status(error.status);
      res.json({ message: error.message });
      return;
    }
    else {
      res.status(500);
      res.json({ message: error.message });
      return;
    }
  }
};

const createTask = async (req, res) => {
  const taskData = req.body;
  try {
    const task = await taskService.createTask(taskData);
    res.status(201);
    res.json(task);

  } catch (error) {
    if(error instanceof HTTPError) {
      res.status(error.status);
      res.json({ message: error.message });
      return;
    }
    else {
      res.status(500);
      res.json({ message: error.message });
      return;
    }
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
    if(error instanceof HTTPError) {
      res.status(error.status);
      res.json({ message: error.message });
      return;
    }
    else {
      res.status(500);
      res.json({ message: error.message });
      return;
    }
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
    if(error instanceof HTTPError) {
      res.status(error.status);
      res.json({ message: error.message });
      return;
    }
    else {
      res.status(500);
      res.json({ message: error.message });
      return;
    }
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
    if(error instanceof HTTPError) {
      res.status(error.status);
      res.json({ message: error.message });
      return;
    }
    else {
      res.status(500);
      res.json({ message: error.message });
      return;
    }
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