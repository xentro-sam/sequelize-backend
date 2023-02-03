const services = require('../../src/services/task.services');
const db = require('../../src/models');

describe('Task services', () => {
    describe('getTasks', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should return tasks', async () => {
            const spy = jest.spyOn(services, 'getTasks');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            const data = [{
                id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                name: 'Task 1',
                isCompleted: false
            }]
            await spyDb.mockResolvedValue(data);
            await services.getTasks();
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toMatchObject(data);
        });
        it('should throw error', async () => {
            const spy = jest.spyOn(services, 'getTasks');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            try {
                await services.getTasks();
                expect(spy).toHaveBeenCalled();
                expect(spyDb).toHaveBeenCalled();
                await spy.mock.results[0].value;
            } catch (error) {
                expect(error).toMatchObject({ message: 'No tasks found', status: 404 });
            }
        });
    });
    describe('getTask', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should return task', async () => {
            const spy = jest.spyOn(services, 'getTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            const data = [{
                id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                name: 'Task 1',
                isCompleted: false
            }]
            await spyDb.mockResolvedValue(data);
            await services.getTask(data[0].id);
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toMatchObject(data);
        });
        it('should throw error', async () => {
            const spy = jest.spyOn(services, 'getTask');
            const spyDb = jest.spyOn(db.Task, 'findAll');
            await spyDb.mockResolvedValue([]);
            try {
                await services.getTask('29c6b13d-1409-4808-ba52-4692dca2ce61');
                expect(spy).toHaveBeenCalled();
                expect(spyDb).toHaveBeenCalled();
                await spy.mock.results[0].value;
            } catch (error) {
                expect(error).toMatchObject({ message: 'Task with id 29c6b13d-1409-4808-ba52-4692dca2ce61 was not found', status: 404 });
            }
        });
    });
    describe('deleteTask', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should delete task', async () => {
            const spy = jest.spyOn(services, 'deleteTask');
            const spyDb = jest.spyOn(db.Task, 'destroy');
            await spyDb.mockResolvedValue(1);
            await services.deleteTask('29c6b13d-1409-4808-ba52-4692dca2ce61');
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toMatch('Task deleted successfully');
        });
        it('should throw error', async () => {
            const spy = jest.spyOn(services, 'deleteTask');
            const spyDb = jest.spyOn(db.Task, 'destroy');
            await spyDb.mockResolvedValue(0);
            try {
                await services.deleteTask('29c6b13d-1409-4808-ba52-4692dca2ce61');
                expect(spy).toHaveBeenCalled();
                expect(spyDb).toHaveBeenCalled();
                await spy.mock.results[0].value;
            } catch (error) {
                expect(error).toMatchObject({ message: 'Task with id 29c6b13d-1409-4808-ba52-4692dca2ce61 was not found', status: 404 });
            }
        });
    });
    describe('createTask', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should create task', async () => {
            const spy = jest.spyOn(services, 'createTask');
            const spyDb = jest.spyOn(db.Task, 'create');
            const data = {
                id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                name: 'Task 1',
                isComplete: false
            }
            await spyDb.mockResolvedValue(data);
            await services.createTask(data);
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toMatchObject(data);
        });
    });
    describe('updateTask', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should update task', async () => {
            const spy = jest.spyOn(services, 'updateTask');
            const spyDb = jest.spyOn(db.Task, 'update');
            const data = {
                id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                name: 'Task 1',
                isComplete: false
            }
            await spyDb.mockResolvedValue([1]);
            await services.updateTask(data);
            expect(spy).toHaveBeenCalled();
            expect(spyDb).toHaveBeenCalled();
            const mockResponse = await spy.mock.results[0].value;
            expect(mockResponse).toMatchObject(data);
        });
        it('should throw error', async () => {
            const spy = jest.spyOn(services, 'updateTask');
            const spyDb = jest.spyOn(db.Task, 'update');
            const data = {
                id: '29c6b13d-1409-4808-ba52-4692dca2ce61',
                name: 'Task 1',
                isComplete: false
            }
            await spyDb.mockResolvedValue([0]);
            try {
                await services.updateTask(data);
                expect(spy).toHaveBeenCalled();
                expect(spyDb).toHaveBeenCalled();
                await spy.mock.results[0].value;
            } catch (error) {
                expect(error).toMatchObject({ message: 'Task with id 29c6b13d-1409-4808-ba52-4692dca2ce61 was not found', status: 404 });
            }
        });
    });
});