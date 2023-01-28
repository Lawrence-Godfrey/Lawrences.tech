import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

import UserSerializer from "../serializers/userSerializer.js";
import { register } from '../controllers/authController.js';

const router = express.Router();
dotenv.config()


/*
 * @route   POST api/auth/register
 */
router.route('/login').post((req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error', status: 'error'});
        }
        if (!user) {
            return res.status(info.statusCode).json({ ...info, statusCode: undefined });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({message: 'Server Error', status: 'error'});
            }

            // Check the rememberMe flag sent through with the log in request and adjust the session accordingly
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            } else {
                req.session.cookie.expires = false;
            }
            return res.status(info.statusCode).json({ ...info, statusCode: undefined });
        });
    }
    )(req, res);
});

router.route('/register').post(register)

router.route('/logout').get((req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({message: 'Server Error', status: 'error'});
        }
        return res.status(200).json({message: 'Logged out successfully', status: 'success'});
    });
});

router.route('/me').get((req, res) => {
    if (req.isAuthenticated()) {
        const serializer = new UserSerializer({instance: req.user});
        return res.status(200).json({ status: 'success', user: serializer.data() });
    }
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
});

router.route('/forgotPassword').post()

// OAuth Routes
// Google
router.route('/oauth/login/google').get(passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.route('/oauth/callback/google').get((req, res) => {
    passport.authenticate('google', {failureRedirect: '/login', failureMessage: true},
        (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Server Error', status: 'error'});
            }
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized', status: 'error'});
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({message: 'Server Error', status: 'error'});
                }

                return res.redirect(`${process.env.HOST}:${process.env.PORT}/`);
            });
        }
    )(req, res);
});

// GitHub
router.route('/oauth/login/github').get(passport.authenticate('github', {
    scope: ['user:email']
}));

router.route('/oauth/callback/github').get(
    passport.authenticate('github', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        req.login(req.user, (err) => {
            if (err) {
                return res.status(500).json({message: 'Server Error', status: 'error'});
            }
            return res.redirect(`${process.env.HOST}:3000/`);
        });
    }
);

export default router;
