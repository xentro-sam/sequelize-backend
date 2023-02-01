//import {expect, jest} from '@jest/globals';
const controllers = require('../../src/controllers/task.controllers');

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
            const req = {
                params: {
                    id: 1
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
            const req = {
                params: {
                    id: 2
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.getTask(req, res);
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('createTask', () => {
        it('should return 201', async () => {
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
        });
        it('should return 400', async () => {
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
        });
    });
    describe('deleteTask', () => {
        it('should return 200', async () => {
            const spy = jest.spyOn(controllers, 'deleteTask');
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.deleteTask(req, res);
            expect(spy).toHaveBeenCalled();
        });
        it('should return 404', async () => {
            const spy = jest.spyOn(controllers, 'deleteTask');
            const req = {
                params: {
                    id: 2
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.deleteTask(req, res);
            expect(spy).toHaveBeenCalled();
        });
    })
    describe('completeTask', () => {
        it('should return 200', async () => {
            const spy = jest.spyOn(controllers, 'completeTask');
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.completeTask(req, res);
            expect(spy).toHaveBeenCalled();
        });
        it('should return 404', async () => {
            const spy = jest.spyOn(controllers, 'completeTask');
            const req = {
                params: {
                    id: 2
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await controllers.completeTask(req, res);
            expect(spy).toHaveBeenCalled();
        });
    })
    describe('updateTask', () => {
        it('should return 200', async() => {
            const spy = jest.spyOn(controllers, 'updateTask');
            const req = {
                params: {
                    id: 1
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
        });
        it('should return 404', async() => {
            const spy = jest.spyOn(controllers, 'updateTask');
            const req = {
                params: {
                    id: 2
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