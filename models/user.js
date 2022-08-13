import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


/**
 * Model a User instance.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {firstName: {minlength: (number|string)[], trim: boolean, maxlength: (number|string)[], type: StringConstructor}, lastName: {minlength: (number|string)[], trim: boolean, maxlength: (number|string)[], type: StringConstructor}, password: {minlength: (number|string)[], type: StringConstructor, required: (boolean|string)[]}, location: {trim: boolean, maxlength: (number|string)[], type: StringConstructor}, isAdmin: {default: boolean, type: BooleanConstructor}, isActive: {default: boolean, type: BooleanConstructor}, email: {unique: boolean, type: StringConstructor, required: (boolean|string)[], validate: {validator: any, message: string}}, username: {minlength: (number|string)[], trim: boolean, maxlength: (number|string)[], unique: boolean, type: StringConstructor, required: (boolean|string)[]}}>}
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
        required: [true, 'A password is required'],
        minlength: [8, 'Password must be at least 8 characters']
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
    }
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
 * Create a JWT token for the user.
 * @memberof User
 * @instance
 * @method createJWT
 * @returns {string} The JWT token
 */
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JTW_EXPIRES_IN }
    );
}

/**
 * Verify that a password is correct for a User instance.
 * @param {string} password    The password to verify.
 * @memberof User
 * @instance
 * @method verifyPassword
 * @returns {Promise<boolean>} True if the password is correct, false otherwise.
 */
UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export default mongoose.model('User', UserSchema);
