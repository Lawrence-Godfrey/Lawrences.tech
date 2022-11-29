import User from '../models/user.js';
import UserSerializer from "../serializers/userSerializer.js";


/**
 * Create a new user if a user with the same email address or username doesn't
 * already exist and all data is valid.
 * @param {Object} req    The request object
 * @param {Object} res    The response object
 * @param {Function} next The next middleware function
 * @returns {Promise<*>}
 */
const register = async (req, res, next) => {
    const serializer = new UserSerializer({ data: req.body });

    if (!serializer.isValid()) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data',
            errors: serializer.errors
        });
    }

    const user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (user) {
        return res.status(400).json({
            status: 'error',
            message: 'User with this email or username already exists'
        });

    } else {
        const newUser = await serializer.save();
        const token = newUser.createJWT();
        res.status(201).json({
            status: 'success',
            user: serializer.data(),
            token
        });
    }
}

/**
 * Get the user with the given id.
 * @param {Object} req    The request object
 * @param {Object} res    The response object
 * @returns {Promise<void>}
 */
const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'User with this email does not exist',
        });
    }

    const serializer = new UserSerializer({ instance: user, data: req.body });
    if (!serializer.isValid({ skip: ['username'] })) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data',
            errors: serializer.errors
        });
    }

    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid password',
            user: serializer.data()
        });
    }

    const token = user.createJWT();
    return res.status(200).json({
        status: 'success',
        user: serializer.data(),
        token
    });
}

export { register, login }