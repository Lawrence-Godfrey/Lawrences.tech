import axios from 'axios';


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
