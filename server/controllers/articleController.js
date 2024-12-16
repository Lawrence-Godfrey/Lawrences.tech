import Article from '../models/article.js';
import ArticleSerializer from "../serializers/articleSerializer.js";


const create = async (req, res, next) => {
    const serializer = new ArticleSerializer({ data: req.body });
    if (!serializer.isValid()) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data',
            errors: serializer.errors
        });
    } else {
        await serializer.save();
        res.status(201).json({
            status: 'success',
            article: serializer.data()
        });
    }
}

const update = async (req, res, next) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
        return res.status(404).json({
            status: 'error',
            message: 'Article not found'
        });
    }

    // Check if user is the author of the article
    if (article.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            status: 'error',
            message: 'You are not allowed to edit this article'
        });
    }

    const serializer = new ArticleSerializer({ instance: article, data: req.body });
    if (!serializer.isValid({ skipRequired: ['_all_'] })) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data',
            errors: serializer.errors
        });
    } else {
        await serializer.save();
        res.status(200).json({
            status: 'success',
            article: serializer.data()
        });
    }
}

/**
 * Creates HTML with Open Graph meta tags for social media crawlers.
 * @param {Object} article - The Mongoose article document
 * @param {string} article.title - The article title
 * @param {string} article.content - The article content
 * @param {string} article._id - The article identifier
 * @param {Date} article.createdAt - The article creation timestamp
 * @returns {string} HTML string with meta tags
 */
const createMetaHtml = (article) => {
    const description = article.content.substring(0, 160).replace(/[#*`_\[\]]/g, '') + '...';

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${escape(article.title)} | Lawrences.tech</title>
            <meta property="og:title" content="${escape(article.title)}" />
            <meta property="og:description" content="${escape(description)}" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://lawrences.tech/articles/${article._id}" />
            <meta property="article:published_time" content="${article.createdAt.toISOString()}" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${escape(article.title)}" />
            <meta name="twitter:description" content="${escape(description)}" />
        </head>
        <body>
            <h1>${escape(article.title)}</h1>
            <p>${escape(description)}</p>
        </body>
        </html>
    `;
};


/**
 * Checks if a user agent string belongs to a social media crawler.
 * @param {string|undefined} userAgent - The user agent string from the request header
 * @returns {boolean} True if the user agent is from a social media crawler
 */
const isSocialMediaCrawler = (userAgent) => {
    userAgent = userAgent?.toLowerCase() || '';
    return userAgent.includes('linkedin') ||
        userAgent.includes('facebook') ||
        userAgent.includes('twitter') ||
        userAgent.includes('slack');
};

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * @param {string} str - The string to escape
 * @returns {string} The escaped string
 */
const escape = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};


/**
 * Sends an HTML response optimized for social media crawlers.
 * @param {Object} res - Express response object
 * @param {Object} article - The Mongoose article document
 * @returns {void}
 */
const sendCrawlerResponse = (res, article) => {
    const html = createMetaHtml(article);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(html);
};

/**
 * Retrieves an article and returns either JSON or HTML based on the requester.
 * For regular users, returns a JSON response with the article data.
 * For social media crawlers, returns HTML with Open Graph meta tags.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
const retrieve = async (req, res, next) => {

    const article = await Article.findById(req.params.id);
    if (!article) {
        return res.status(404).json({
            status: 'error',
            message: 'Article not found'
        });
    }

    if (isSocialMediaCrawler(req.get('user-agent'))) {
        return sendCrawlerResponse(res, article);
    }

    res.status(200).json({
        status: 'success',
        article: new ArticleSerializer({ instance: article }).data()
    });
}


const deleteArticle = async (req, res, next) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
        return res.status(404).json({
            status: 'error',
            message: 'Article not found'
        });
    }
    await article.delete();
    res.status(204).json({
        status: 'success',
        message: 'Article deleted'
    });
}


const list = async (req, res, next) => {
    // Get articles ordered by date
    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        articles: articles.map(article => new ArticleSerializer({ instance: article }).data())
    });
}


export { create, update, retrieve, list, deleteArticle }
