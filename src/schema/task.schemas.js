const Joi = require('joi');

const taskValidation = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(1).max(30).required(),
    isComplete: Joi.boolean().required()
});

const idValidation = Joi.object({
    id: Joi.string().uuid().required()
});

module.exports = { taskValidation, idValidation }