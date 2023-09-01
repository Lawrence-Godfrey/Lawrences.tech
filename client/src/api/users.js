import axios from 'axios';

/**
 * Fetches a single user from the backend
 * @param {string} id - The id of the user to fetch
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const user = await fetchUser('1234');
 */
export async function fetchUser(id) {
    const response = await axios.get(`/api/users/${id}`);
    return response.data.user;
}
