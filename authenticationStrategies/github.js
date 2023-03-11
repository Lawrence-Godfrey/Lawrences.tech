import dotenv from 'dotenv';
import GitHubStrategy from 'passport-github2';

import User from '../models/user.js';


dotenv.config()


/**
 * GitHub OAuth Strategy to be used with passport.js.
 * @type {Strategy}
 */
const githubStrategy = new GitHubStrategy({
        clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
        let user = await User.findOne({oauthType: 'github', oauthId: profile.id})

        if (user) {
            return cb(null, user)
        }

        user = await User.findOne({email: profile.emails[0].value})

        if (user) {
            user.oauthType = 'github'
            user.oauthId = profile.id

            if (profile.photos && profile.photos.length > 0) {
                user.avatar = profile.photos[0].value
            }

            await user.save()
            return cb(null, user)
        }

        else {
            try {
                // Split the displayName into first and last name if possible
                const name = profile.displayName.split(' ')

                const firstName = name[0]
                const lastName = name[1] ? name[1] : ''

                const newUser = new User({
                    oauthType: 'github',
                    oauthId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.username,
                    firstName: firstName,
                    lastName: lastName,
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


export default githubStrategy;
