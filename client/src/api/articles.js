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
