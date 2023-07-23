import Serializer from './serializer.js';
import Article from '../models/article.js';


/**
 * Validate article data from a request.
 * @module serializers/articleSerializer
 */
class ArticleSerializer extends Serializer {

    /**
     * Set up the instance with the data from the request.
     * @param options {Object}
     * @param options.data {Object} The request data.
     * @param options.instance {mongoose.Document} The article instance.
     */
    constructor(options) {
        const fields = {
            _id: {
                readOnly: true,
                displayName: 'id'
            },
            title: {},
            content: {},
            createdAt: {
                readOnly: true,
            },
            updatedAt: {
                readOnly: true,
            },
            author: {},
        }

        const model = Article;

        super(options, fields, model);
    }
}

export default ArticleSerializer;
