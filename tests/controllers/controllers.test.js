//import {expect, jest} from '@jest/globals';
const controllers = require('../../src/controllers/task.controllers');
const db = require('../../src/models');

describe('Task controllers', () => {
    describe('getTasks', () => {
        it('should return 200', async () => {
            const spy = jest.spyOn(controllers, 'getTasks')
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.getTasks(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200);
        });
        it('should return 404', async () => {
            const spy = jest.spyOn(controllers, 'getTasks');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.getTasks(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404);
        });
    });
    describe('getTask', () => {
        it('should return 200', async () => {
            const spy = jest.spyOn(controllers, 'getTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([
                {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                    name: 'Task 1',
                    isCompleted: false
                }
            ]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.getTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200);
        });
        it('should return 404', async () => {
            const spy = jest.spyOn(controllers, 'getTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.getTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404);
        });
    });
    describe('createTask', () => {
        xit('should return 201', async () => {
            const spy = jest.spyOn(controllers, 'createTask');
            const req = {
                body: {
                    name: 'Buy milk',
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.createTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(201);
        });
        xit('should return 400', async () => {
            const spy = jest.spyOn(controllers, 'createTask');
            const req = {
                body: ['Buy milk']
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.createTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(400);
        });
    });
    describe('deleteTask', () => {
        it('should return 200', async () => {
            const spy = jest.spyOn(controllers, 'deleteTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([
                {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                    name: 'Task 1',
                    isCompleted: false
                }
            ]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.deleteTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200);
        });
        it('should return 404', async () => {
            const spy = jest.spyOn(controllers, 'deleteTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.deleteTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404);
        });
    })
    describe('completeTask', () => {
        it('should return 200', async () => {
            const spy = jest.spyOn(controllers, 'completeTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([
                {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                    name: 'Task 1',
                    isCompleted: false
                }
            ]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.completeTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200);
        });
        it('should return 404', async () => {
            const spy = jest.spyOn(controllers, 'completeTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.completeTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404);
        });
    })
    describe('updateTask', () => {
        xit('should return 200', async() => {
            const spy = jest.spyOn(controllers, 'updateTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([
                {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                    name: 'Task 1',
                    isCompleted: false
                }
            ]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                },
                body: {
                    name: 'Buy milk',
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.updateTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200);
        });
        xit('should return 404', async() => {
            const spy = jest.spyOn(controllers, 'updateTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce61'
                },
                body: {
                    name: 'Buy milk',
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.updateTask(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404);
        });
        /*it('should return 400', () => {
            const req = {
                params: {
                    id: 1
                },
                body: ['Buy milk']
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            controllers.updateTask(req, res);
            expect(spy).toHaveBeenCalled();
        });*/
    })
});