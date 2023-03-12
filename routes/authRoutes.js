import express from 'express';
import dotenv from 'dotenv';

import {
    register,
    logout,
    localLogin,
    getCurrentUser,
    googleLogin,
    googleCallback,
    githubCallback,
    githubLogin,
    forgotPassword,
    resetPassword,
} from '../controllers/authController.js';


const router = express.Router();

dotenv.config()


router.route('/login').post(localLogin);
router.route('/register').post(register)
router.route('/logout').get(logout);
router.route('/me').get(getCurrentUser);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').put(resetPassword);

router.route('/oauth/login/google').get(googleLogin);
router.route('/oauth/callback/google').get(googleCallback);

router.route('/oauth/login/github').get(githubLogin);
router.route('/oauth/callback/github').get(githubCallback);

export default router;
