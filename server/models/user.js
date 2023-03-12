import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


/**
 * @class User
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The user's password.
 * @property {boolean} isVerified - Whether the user has verified their email.
 * @property {boolean} isAdmin - Whether the user is an admin.
 * @property {boolean} isActive - Whether the user is active.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} avatar - The avatar of the user (url). Defaults to a gravatar.
 * @property {string} location - The location of the user (city, state, country).
 * @property {string} oauthType - The type of OAuth used to create the user (google, github, local).
 * @property {string} oauthId - The id of the user in the OAuth provider.
 * @property {Date} createdAt - The date the user was created.
 * @property {Date} updatedAt - The date the user was last updated.
 * @property {string} resetPasswordToken - The token used to reset the user's password.
 * @property {Date} resetPasswordExpires - The date the reset password token expires.
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username is required'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username must be at most 40 characters'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'An email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Email is not valid'
        },
        unique: true
    },
    password: {
        type: String,
        required: false,
        minlength: [8, 'Password must be at least 8 characters']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    firstName: {
        type: String,
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [35, 'First name must be at most 35 characters']
    },
    lastName: {
        type: String,
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [35, 'Last name must be at most 35 characters']
    },
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp'
    },
    location: {
        type: String,
        trim: true,
        maxlength: [50, 'Location must be at most 50 characters']
    },
    oauthType: {
        type: String,
        enum: ['google', 'github', 'local'],
        default: 'local'
    },
    oauthId: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
},{
    timestamps: true
});


/**
 * Perform any necessary pre-save operations.
 * Includes hashing the password.
 * @memberof User
 * @instance
 * @method pre
 * @returns {Promise<void>} A promise that resolves when the pre-save operations are complete.
 */
UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})


/**
 * Verify that a password is correct for a User instance.
 * @param {string} password - The password to verify.
 * @param {function} callback - The callback to call when the query is complete.
 * @memberof User
 * @instance
 * @method verifyPassword
 * @returns {Promise<boolean>} True if the password is correct, false otherwise.
 */
UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
}

/**
 * Find a user by their ID.
 * @param {string} id - The ID of the user to find.
 * @param {function} callback - The callback to call when the query is complete.
 * @memberof User
 * @static
 * @method findByEmail
 * @returns {Promise<User>} A promise that resolves with the user that matches the ID.
 */
UserSchema.statics.findById = function (id, callback) {
    return this.findOne({ _id: id }, callback);
}


export default mongoose.model('User', UserSchema);
