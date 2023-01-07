import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


/**
 * Model a User instance.
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
},{
    timestamps: true
});


/**
 * Perform any necessary pre-save operations.
 * Includes hashing the password.
 */
UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})


/**
 * Verify that a password is correct for a User instance.
 * @param {string} password    The password to verify.
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

// Find user by id
UserSchema.statics.findById = function (id, callback) {
    return this.findOne({ _id: id }, callback);
}


export default mongoose.model('User', UserSchema);
