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


const retrieve = async (req, res, next) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
        return res.status(404).json({
            status: 'error',
            message: 'Article not found'
        });
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
    const articles = await Article.find({});
    res.status(200).json({
        status: 'success',
        articles: articles.map(article => new ArticleSerializer({ instance: article }).data())
    });
}


export { create, update, retrieve, list, deleteArticle }
