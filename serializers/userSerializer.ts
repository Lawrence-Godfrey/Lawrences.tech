import Serializer from './serializer.js';
import User from '../models/user.js';


/**
 * Validate user data from a request.
 * @module serializers/userSerializer
 */
class UserSerializer extends Serializer {

    /**
     * Set up the instance with the data from the request.
     * @param requestData The request object
     */
    constructor(requestData) {
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
        }

        const model = User;

        super(requestData, fields, model);
    }

}

export default UserSerializer;
