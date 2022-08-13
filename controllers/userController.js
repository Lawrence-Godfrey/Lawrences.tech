import User from '../models/user.js';
import UserSerializer from "../serializers/userSerializer.js";


/**
 * Update a user with the given id.
 * @param {Object} req    The request object
 * @param {Object} res    The response object
 * @param {Function} next The next middleware function
 * @returns {Promise<*>}
 */
const update = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    const serializer = new UserSerializer({ instance: user, data: req.body });
    if (!serializer.isValid({ skipRequired: ['email', 'username', 'password'] })) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data',
            errors: serializer.errors
        });
    } else {
        await serializer.save();
        res.status(200).json({
            status: 'success',
            user: serializer.data()
        });
    }
}

/**
 * Get the user with the given id.
 * @param {Object} req    The request object
 * @param {Object} res    The response object
 * @param {Function} next The next middleware function
 * @returns {Promise<*>}
 */
const retrieve = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }
    res.status(200).json({
        status: 'success',
        user: new UserSerializer({ instance: user }).data()
    });
}

/**
 * List all users.
 * @param {Object} req    The request object
 * @param {Object} res    The response object
 * @param {Function} next The next middleware function
 * @returns {Promise<*>}
 */
const list = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        users: users.map(user => new UserSerializer({ instance: user }).data())
    });
}

export { update, retrieve, list }