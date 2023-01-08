import Serializer from './serializer.js';
import User from '../models/user.js';


/**
 * Validate user data from a request.
 * @module serializers/userSerializer
 */
class UserSerializer extends Serializer {

    /**
     * Set up the instance with the data from the request.
     * @param options {Object} Object containing either the request data or a Use instance.
     * @param options.data {Object} The request data.
     * @param options.instance {mongoose.Document} The user instance.
     */
    constructor(options) {
        const fields = {
            _id: {
                readOnly: true,
                displayName: 'id'
            },
            username: {},
            email: {},
            password: {
                writeOnly: true
            },
            firstName: {},
            lastName: {},
            createdAt: {
                readOnly: true,
            },
            updatedAt: {
                readOnly: true,
            },
            isAdmin: {},
            isActive: {},
            location: {},
            avatar: {},
        }

        const model = User;

        super(options, fields, model);
    }

}

export default UserSerializer;
