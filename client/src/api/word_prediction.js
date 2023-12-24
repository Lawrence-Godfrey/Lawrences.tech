import axios from 'axios';


/**
 * Returns a list of predicted words for the given sentences.
 * @param {Array<String>} sentences
 * @return {Promise<*>}
 * @throws {Error}
 * @example
 * const words = await gePrediction(['I like to ____ apples']);
 */
export async function getPrediction(sentences) {
    // Strip out empty sentences
    sentences = sentences.filter((sentence) => sentence.length > 0);
    const response = await axios.post('/api/tipofyourtongue/predict-word', { sentences });
    return response.data.words;
}
