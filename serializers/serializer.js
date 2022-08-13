
class Serializer {

    /**
     * Set up the _instance with the data from the request or the instance
     * as well as the fields object and the model to save to or get data from.
     * @param {Object} options                        An object containing either the request data or a model instance.
     * @param {Object} options.data                   The request data.
     * @param {mongoose.Document} options.instance    The model instance.
     * @param {Object} fields                          The fields to save to the _instance
     * @param {Model} model                          The model to save to or get data from
     */
    constructor(options, fields, model) {

        this._data = options.data;
        this._instance = options.instance;
        this._fields = fields;
        this._model = model;

        this._fieldsToSave = [];
        this._fieldsToReturn = [];
        this._displayNames = {};
        this._errors = {};
        this._validated = false;

        // Loop through the fields and set up the fieldsToSave, fieldsToReturn, and displayNames arrays.
        for (let key in this._fields) {
            if (this._fields[key]['readOnly'] && this._fields[key]['readOnly'] === true) {
                this._fieldsToReturn.push(key);
                if (this._fields[key]['displayName']) {
                    this._displayNames[key] = this._fields[key]['displayName'];
                }
            } else if (this._fields[key]['writeOnly'] && this._fields[key]['writeOnly'] === true) {
                if (this._data && this._data[key]) {
                    this._fieldsToSave.push(key);
                }
            } else {
                if (this._data && this._data[key]) {
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
        return this._data;
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
        return this.getSubset(this._data, this._fieldsToSave, this._displayNames);
    }

    /**
     * Save the instance to the database, only saving the fields in fieldsToSave.
     * @returns {Promise}
     */
    async save() {
        if (!this._validated)
            throw new Error('Data is not valid.');

        try {
            if (this._instance) {
                // Update the instance with the validated data.
                for (let key of this._fieldsToSave) {
                    this._instance[key] = this._data[key];
                }
                await this._instance.save();
            } else {
                this._instance = await this._model.create(this.validatedData());
            }
            return this._instance;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    /**
     * Get the data to return to the client from the instance.
     * @returns {Object} data   The data to return to the client
     * @throws {Error}          If there is no instance.
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
     * @param {Object} [options]                  Options to use when validating.
     * @param {[string]} [options.skip]           Fields to skip when validating.
     * @param {[string]} [options.skipRequired]   Fields skip if they are required and not present.
     * @returns {boolean}
     */
    isValid({ skip=[], skipRequired=[]}={}) {
        const instance = new this._model(this.validatedData());
        const errors = instance.validateSync({ pathsToSkip: skip });
        if (errors) {
            // Loop through the error keys and get the message for each.
            for (let [key, value] of Object.entries(errors.errors)) {
                if (skipRequired.includes(key) && value.kind === 'required') {
                    continue;
                }
                this._errors[key] = { message: value.message };
            }
        }

        if (Object.keys(this._errors).length !== 0) {
            this._validated = false;
            return false;
        } else {
            this._validated = true;
            return true;
        }
    }
}

export default Serializer;