const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const taskService = {
    createTask : async (task) => {
        const id = uuidv4();
        return db.Task.create({
            ...task,
            id,
            isComplete: false
        });
    },
    getTasks : async () => {
        const tasks = await db.Task.findAll();
        return tasks;
    },
    getTask : async (id) => {
        const task = await db.Task.findOne({ where: { id: id } });
        return task;
    },
    deleteTask : (id) => {
        return new Promise(async (resolve, reject) => {
          const task = await db.Task.findOne({ where: { id: id } });
          if(!task) {
            reject(`Task with id ${id} was not found`);
          }
          db.Task.destroy({ where: { id: id } });
          resolve('Task deleted successfully');
        });
    },
    completeTask : (id) => {
        return new Promise(async (resolve, reject) => {
          const task = await db.Task.findOne({ where: { id: id } });
          if(!task) {
            reject(`Task with id ${id} was not found`);
          }
          db.Task.update({ isComplete: true }, { where: { id: id } });
          task.isComplete = true;
          resolve(task);
        })
    },
    updateTask : (id, data) => {
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

module.exports = taskService;