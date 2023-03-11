import localStrategy from './local.js';
import googleStrategy from './google.js';
import githubStrategy from './github.js';
import passport from 'passport';
import User from '../models/user.js';

passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(githubStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

export default passport;
