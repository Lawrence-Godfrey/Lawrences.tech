import {HydratedDocument, Model} from "mongoose";


class Serializer {
    private readonly _requestData: {};
    private readonly _fields: {};
    private readonly _model: Model<any, any, any, any, any>;

    private readonly _fieldsToSave: string[]
    private readonly _fieldsToReturn: string[]
    private readonly _displayNames: {}
    private _instance: HydratedDocument<any, any, any>;
    private readonly _errors: {}

    /**
     * Set up the _instance with the data from the request,
     * as well as the fields object and the model to save to or get data from.
     * @param {Object} requestData     The request object
     * @param {Object} fields           The fields to save to the _instance
     * @param {Object} model           The model to save to or get data from
     */
    constructor(requestData, fields, model) {

        this._requestData = requestData;
        this._fields = fields;
        this._model = model;

        this._fieldsToSave = [];
        this._fieldsToReturn = [];
        this._displayNames = {};
        this._instance = null;
        this._errors = {};

        // Loop through the request data and only save the fields which are also in the fields object.
        for (let key in this._fields) {
            if (this._fields[key]['readOnly'] && this._fields[key]['readOnly'] === true) {
                this._fieldsToReturn.push(key);
                if (this._fields[key]['displayName']) {
                    this._displayNames[key] = this._fields[key]['displayName'];
                }
            } else if (this._fields[key]['writeOnly'] && this._fields[key]['writeOnly'] === true) {
                if (this._requestData[key]) {
                    this._fieldsToSave.push(key);
                }
            } else {
                if (this._requestData[key]) {
                    this._fieldsToSave.push(key);
                }

                this._fieldsToReturn.push(key);

                if (this._fields[key]['displayName']) {
                    this._displayNames[key] = this._fields[key]['displayName'];
                }
            }
        }
    }
    
    get errors() {
        return this._errors;
    }

    get instance() {
        return this._instance;
    }

    get fieldsToSave() {
        return this._fieldsToSave;
    }

    get fieldsToReturn() {
        return this._fieldsToReturn;
    }

    get displayNames() {
        return this._displayNames;
    }

    get fields() {
        return this._fields;
    }

    get requestData() {
        return this._requestData;
    }

    get model() {
        return this._model;
    }

    /**
     * Get a subset of the fields in the instance which are also in fields.
     * Also use the name in displayNames if possible.
     * @param {Object} sourceObject      The instance to get the subset from
     * @param {Array} fields         The fields to get from the instance
     * @param {Object} displayNames  The display names to use for the fields
     * @returns {Object} subset      The subset of the instance
     */
    getSubset(sourceObject, fields, displayNames) {

        displayNames = displayNames || {};

        // Get the subset of fields in the instance which are also in fields.
        // Loop through fields


        let subset = {};
        for (let key of fields) {
            if (sourceObject[key]) {
                if (displayNames[key]) {
                    subset[displayNames[key]] = sourceObject[key];
                } else {
                    subset[key] = sourceObject[key];
                }
            }
        }

        return subset;
    }

    /**
     * Get the validated fields to save.
     * @returns {Object} validatedData   The validated fields to save
     */
    validatedData() {
        return this.getSubset(this._requestData, this._fieldsToSave, this._displayNames);
    }

    /**
     * Save the instance to the database, only saving the fields in fieldsToSave.
     * @returns {Promise}
     */
    async save() {
        if (this.isValid({})) {
            try {
                this._instance = await this._model.create(this.validatedData());
                return this._instance;
            } catch (err) {
                console.log(err);
                return null;
            }
        }
    }

    /**
     * Get the data to return to the client from the instance.
     * @returns {HydratedDocument} data   The data to return to the client
     */
    data() {
        if (this._instance) {
            // Get fields from this._instance which are in this._fieldsToReturn.
            return this.getSubset(this._instance, this._fieldsToReturn, this._displayNames);
        } else {
            throw new Error('No instance to get data from.');
        }
    }

    /**
     * Return whether the data is valid or not.
     * @param {Object} options    Options to use when validating.
     *                            Can include 'skipRequired' to skip required fields.
     * @returns {boolean}
     */
    isValid(options) {
        options = options || {};
        let skipRequired = options['skipRequired'] || [];

        this._instance = new this._model(this.validatedData());
        const errors = this._instance.validateSync(["email", "password"]);
        if (errors) {
            // Loop through the error keys and get the message for each.
            for (let key in errors.errors) {
                this._errors[key] = { message: errors.errors[key].message };
            }
            return false;
        } else {
            return true;
        }
    }

}

export default Serializer;