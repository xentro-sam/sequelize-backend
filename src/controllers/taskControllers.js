const db = require('../models');
const { v4: uuidv4 } = require('uuid');

class Controller {
  static getTasks = async () => {
    const users = await db.Task.findAll();
    return users;
  } 
    
  static getTask = async (id) => {
    const task = await db.Task.findOne({ where: { id: id } });
    return task;
  }

  static createTask = async (task) => {
    const newTask = await db.Task.create({
        ...task,
        id: uuidv4(),
        isComplete: false
    });
    return newTask;
  }

  static deleteTask = (id) => {
    return new Promise(async (resolve, reject) => {
      const task = await db.Task.findOne({ where: { id: id } });
      if(!task) {
        reject(`Task with id ${id} was not found`);
      }
      console.log('task', task)
      db.Task.destroy({ where: { id: id } });
      resolve('Task deleted successfully');
    });
  }

  static completeTask = (id) => {
    return new Promise(async (resolve, reject) => {
      const task = await db.Task.findOne({ where: { id: id } });
      if(!task) {
        reject(`Task with id ${id} was not found`);
      }
      db.Task.update({ isComplete: true }, { where: { id: id } });
      task.isComplete = true;
      resolve(task);
    })
  }
  
  static updateTask = (id, data) => {
    return new Promise(async (resolve, reject) => {
      let task = await db.Task.findOne({ where: { id: id } });
      if(!task) {
        reject(`Task with id ${id} was not found`);
      }
      db.Task.update({ ...data }, { where: { id: id } });
      task = await db.Task.findOne({ where: { id: id } });
      resolve(task);
    });
  }
}

module.exports = Controller;