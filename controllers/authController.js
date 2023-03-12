import passport from 'passport';

import User from '../models/user.js';
import UserSerializer from '../serializers/userSerializer.js';


/**
 * Log in the user with the given email and password,
 * using the local database.
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Promise<*>}
 */
const localLogin = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 'error',
            message: 'Email and password are required',
        });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error' });
        }

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'User with this email does not exist',
            });
        }
    });

    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error' });
        }

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Server Error', status: 'error' });
            }

            // Check the rememberMe flag sent through with the log in request and adjust the session accordingly
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            } else {
                req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
            }

            return res.status(200).json({
                status: 'success',
                message: 'Logged in successfully',
                user: new UserSerializer({ instance: user }).data(),
            });
        });
    })(req, res);
};


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
            errors: serializer.errors,
        });
    }

    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }, async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error' });
        }

        if (user) {
            return res.status(400).json({
                status: 'error',
                message: 'User with this email or username already exists',
            });
        } else {
            const newUser = await serializer.save();
            req.login(newUser, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(201).json({
                    status: 'success',
                    message: 'User created successfully',
                    user: serializer.data(),
                });
            });
        }
    });
};


/**
 * Log out the current user
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Promise<*>}
 */
const logout = (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error' });
        }
        return res.status(200).json({ message: 'Logged out successfully', status: 'success' });
    });
};


/**
 * Get the current user
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Promise<*>}
 */
const getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        const serializer = new UserSerializer({ instance: req.user });
        return res.status(200).json({ status: 'success', user: serializer.data() });
    }
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
};


/**
 * Send a password reset link to the user's email address
 * @param req The request object
 * @param res The response object
 * @returns {Promise<*>}
 */
const forgotPassword = (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({
            status: 'error',
            message: 'Email is required',
        });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error' });
        }

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'User with this email does not exist',
            });
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Server Error', status: 'error' });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                https://${req.headers.host}/reset/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Server Error', status: 'error' });
                }
                return res.status(200).json({
                    status: 'success',
                    message: 'An email has been sent to ' + user.email + ' with further instructions.',
                });
            });
        });
    });
};


/**
 * Reset the user's password given the token. The token needs to be valid and
 * not expired.
 * @param req The request object
 * @param res The response object
 * @returns {Promise<*>}
 */
const resetPassword = (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error' });
        }

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Password reset token is invalid or has expired.',
            });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Server Error', status: 'error' });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Your password has been changed',
                text: `Hello,\n\n
                This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Server Error', status: 'error' });
                }
                return res.status(200).json({ status: 'success', message: 'Your password has been updated.' });
            });
        });
    });
};

/**
 * Redirect the user to the Google authentication page.
 * @param req The request object
 * @param res The response object
 */
const googleLogin = (req, res) => {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })(req, res);
};


/**
 * Redirect the user to the GitHub authentication page.
 * @param req The request object
 * @param res The response object
 */
const githubLogin = (req, res) => {
    passport.authenticate('github')(req, res);
};


/**
 * Redirect the user to the home page after authentication.
 * @param provider The provider to authenticate with
 * @returns {function(*, *): *}
 */
const callback = (provider) => {
    return (req, res) => {
        passport.authenticate(
            provider, { failureRedirect: '/login', failureMessage: true }, (err, user) => {
                if (err) {
                    return res.status(500).json({ message: 'Server Error', status: 'error' });
                }
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized', status: 'error' });
                }
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Server Error', status: 'error' });
                    }

                    return res.redirect(req.origin);
                });
            },
        );
    };
}


export {
    register,
    logout,
    localLogin,
    getCurrentUser,
    googleLogin,
    githubLogin,
    callback,
    forgotPassword,
    resetPassword,
};
