const { idValidation } = require('../schema/task.schemas');

const validateId = (req, res, next) => {
    const { uuid } = req.params;
    const { error } = idValidation.validate({ uuid });
    if (error) {
        res.status(400);
        res.json({ message: error.message });
        return;
    }
    next();
}

module.exports = { validateId };