const middlewares = require('../../src/middlewares/task.validations');

describe('Task validations', () => {
    describe('validateId', () => {
        it('should return 400', () => {
            const spy = jest.spyOn(middlewares, 'validateId');
            const req = {
                params: {
                    id: '29c6b13d-1409-4808-ba52-4692dca2ce6'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            middlewares.validateId(req, res);
            expect(spy).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(400);
        });
    });
});