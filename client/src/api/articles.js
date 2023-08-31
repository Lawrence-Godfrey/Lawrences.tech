import axios from 'axios';
import { fetchUser } from './users';


/**
 * Fetches all articles from the server
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const articles = await fetchArticles();
 */
export async function fetchArticles() {
    const response = await axios.get('/api/articles');
    return response.data.articles;
}

/**
 * Fetches all articles from the server with their authors
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const articles = await fetchArticlesWithAuthors();
 */
export async function fetchArticlesWithAuthors() {
    const articles = await fetchArticles();
    for (let i = 0; i < articles.length; i++) {
        articles[i].author = await fetchUser(articles[i].author);
    }
    return articles;
}

/**
 * Fetches a single article from the server
 * @param {string} id - The id of the article to fetch
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const article = await fetchArticle('1234');
 */
export async function fetchArticle(id) {
    const response = await axios.get(`/api/articles/${id}`);
    return response.data.article;
}

/**
 * Updates the article on the server
 * @param {string} id - The id of the article to update
 * @param {Object} article - The article data to update
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const article = await updateArticle('1234', { title: 'New Title' });
 */
export async function updateArticle(id, article) {
    const response = await axios.patch(`/api/articles/${id}`, article);
    return response.data.article;
}


/**
 * Creates a new article on the server
 * @param {Object} article
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const article = await createArticle({ title: 'New Title' });
 */
export async function createArticle(article) {
    const response = await axios.post('/api/articles', article);
    return response.data.article;
}
