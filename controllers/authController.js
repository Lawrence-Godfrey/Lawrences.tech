import User from '../models/user.js';
import UserSerializer from "../serializers/userSerializer.js";
import passport from "passport";
import LocalStrategy from "passport-local";


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    // Find the user with the given email
    User.findOne({email: email}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                statusCode: 401,
                status: 'error',
                message: 'User with this email does not exist',
            });
        }

        // Check if the password is correct
        user.verifyPassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, {
                    statusCode: 401,
                    status: 'error',
                    message: 'Incorrect password',
                });
            }

            const serializer = new UserSerializer({instance: user});

            return done(null, user, {
                statusCode: 200,
                status: 'success',
                message: 'Logged In Successfully',
                user: serializer.data()
            });
        });
    });
}));


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
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                user: serializer.data()
            });
        });
    }
}

// Serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


export { register }