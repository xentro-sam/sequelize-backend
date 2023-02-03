const { idValidation } = require('../schema/task.schemas');

const validateId = (req, res, next) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        res.status(400);
        res.json({ message: error.message });
        return;
    }
    next();
}

module.exports = { validateId };