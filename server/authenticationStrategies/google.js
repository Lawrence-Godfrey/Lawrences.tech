import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';

import User from '../models/user.js';


dotenv.config();


/**
 * Strategy for Google OAuth to be used with passport.js.
 * @type {Strategy}
 */
const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
        let user = await User.findOne({oauthType: 'google', oauthId: profile.id})

        if (user) {
            return cb(null, user)
        }

        user = await User.findOne({email: profile.emails[0].value})

        if (user) {
            user.oauthType = 'google'
            user.oauthId = profile.id

            if (profile.photos && profile.photos.length > 0) {
                user.avatar = profile.photos[0].value
            }

            await user.save()
            return cb(null, user)
        }

        else {
            try {
                const newUser = new User({
                    oauthType: 'google',
                    oauthId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    avatar: profile.photos[0].value,
                })

                const error = await newUser.validate()
                if (error) {
                    // handle the error here, for example by returning it to the client
                    return cb(error, null)
                }

                await newUser.save()
                return cb(null, newUser)
            } catch (err) {
                return cb('Error creating user', null)
            }
        }
    }
);

export default googleStrategy;
