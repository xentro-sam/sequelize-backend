const { idValidation } = require('../schema/task.schemas');
const axios = require('axios');

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

const isSignedIn = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const validate = await axios.post('http://localhost:4000/token/validate', { token });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
        return;
    }
    next();
}

module.exports = { validateId, isSignedIn };