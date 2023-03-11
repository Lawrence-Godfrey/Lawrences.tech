import dotenv from 'dotenv';

import User from '../models/user.js';
import LocalStrategy from 'passport-local';


dotenv.config()


/**
 * Local authentication strategy to be used with passport.js.
 * This strategy is used to authenticate users, who are stored in the local database,
 * using a username and password.
 * @type {Strategy}
 */
const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // Find the user with the given email
    User.findOne({email: email}, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        user.verifyPassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});


export default localStrategy;
