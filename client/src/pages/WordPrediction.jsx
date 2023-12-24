import React, { useState } from 'react';

import { Footer, Navbar } from '../components';
import { getPrediction } from '../api/word_prediction';
import Error500 from './Error500';

const WordPrediction = () => {
    const [errors, setErrors] = useState([false, false, false]);
    const [requestError, setRequestError] = useState(null);

    const [sentences, setSentences] = useState(['', '', '']);
    const [responseWords, setResponseWords] = useState([]);

    const wordsRef = React.useRef(null);

    const validateSentence = (sentence) => {
        return sentence.includes('____') && (sentence.match(/____/g) || []).length === 1;
    };

    const handleInputChange = (index, event) => {
        const newSentence = event.target.value;
        const newSentences = sentences.map((sentence, i) =>
            i === index ? newSentence : sentence,
        );
        setSentences(newSentences);


        // Validate if not empty
        if (newSentence) {
            const newErrors = errors.slice();
            newErrors[index] = !validateSentence(newSentence);
            setErrors(newErrors);
        } else {
            const newErrors = errors.slice();
            newErrors[index] = false;
            setErrors(newErrors);
        }
    };

    const getWords = async () => {
        // Only proceed if all sentences are valid
        if (errors.some((error) => error)) {
            alert('Please correct the errors in the sentences.');
            return;
        }

        getPrediction(sentences)
            .then((words) => {
                // Get the first 5 words. words is a list of lists, where the first element in each list is the word.
                words = words.map((word) => word[0]);
                setResponseWords(words.slice(0, 5));
                // Scroll to the bottom of the page
                window.scrollTo({
                    left: 0,
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            })
            .catch((err) => {
                setResponseWords([]);
                setRequestError(err);
            });
    };

    if (requestError) {
        console.log(requestError);
        return <Error500 />;
    }

    return (
        <div>
            <Navbar />
            <div className="py-8 px-4 mx-auto max-w-screen-md min-h-screen lg:py-16 lg:px-6">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                        Tip of Your Tongue
                    </h2>
                    <p className="font-light text-gray-500 mb-8 sm:text-xl dark:text-gray-400">
                        Ever had a word on the tip of your tongue? This tool will help you find it.
                        <br/> Simply enter some sentences where you might use the word, but leave a ____
                        where the word should be used, and we&apos;ll try to predict the word for
                        you.
                    </p>

                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </div>

                <div className="flex flex-col items-center justify-center mt-24 w-full">
                    <div className="mb-4 w-8/12">
                        {sentences.map((sentence, index) => (
                            <div className="mb-6" key={index}>
                                <label htmlFor="large-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Sentence {index + 1} </label>
                                <input type="text" id="large-input"
                                    onChange={(e) => handleInputChange(index, e)}
                                    className={`block w-full p-4 m-2 text-gray-900 border rounded-lg
                                    bg-gray-50 sm:text-md
                                    ${errors[index] ?
                                'border-red-500 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-1' :
                                'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-1'}`}
                                />
                                {errors[index] && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        The sentence must contain exactly one ____ token.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400
                        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={getWords}
                        >
                            Find the word
                        </button>
                    </div>
                </div>

                <div ref={wordsRef} className="text-center mt-24">
                    {responseWords.length > 0 && (
                        <h2 className="mb-4 text-xl lg:text-3xl tracking-tight font-extrabold text-gray-900">
                            The word you&apos;re thinking of is probably...
                        </h2>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center mt-20">
                    <div className="flex flex-col items-center">
                        {responseWords.map((word, index) => (
                            <span key={index} className="p-2 text-2xl text-gray-700 bg-gray-200 border rounded m-1
                            w-full text-center tracking-tight">
                                {word}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default WordPrediction;
