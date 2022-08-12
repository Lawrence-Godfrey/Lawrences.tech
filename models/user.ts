import mongoose from 'mongoose';
import validator from 'validator';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');


export interface UserDoc extends mongoose.Document {
    email: {
        type: string;
        unique: boolean;
        required: boolean;
    },
    password: {
        type: string;
        required: boolean;
    },
    createdAt: {
        type: Date;
        default: Date;
    },
    updatedAt: {
        type: Date;
        default: Date;
    },
    isAdmin: {
        type: boolean;
        default: boolean;
    },
    isActive: {
        type: boolean;
        default: boolean;
    },
    firstName: {
        type: string;
        trim: boolean;
        minlength: number;
        maxlength: number;
    },
    lastName: {
        type: string;
        trim: boolean;
        minlength: number;
        maxlength: number;
    },
    location: {
        type: string;
        trim: boolean;
        maxlength: number;
        default: string;
    },

    /**
     * Create a JWT token for the user.
     * @memberof User
     * @instance
     * @method createJWT
     * @returns {string} The JWT token
     */
    createJWT: () => string;

    /**
     * Verify that a password is correct for a User instance.
     * @param {string} password    The password to verify.
     * @memberof User
     * @instance
     * @method verifyPassword
     * @returns {Promise<boolean>} True if the password is correct, false otherwise.
     */
    verifyPassword: (password: string) => Promise<boolean>;
}


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
        required: [true, 'A password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
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
        maxlength: [50, 'Location must be at most 50 characters'],
        default: 'No location specified'
    }
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


UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JTW_EXPIRES_IN }
    );
}


UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export default mongoose.model<UserDoc>('User', UserSchema);
