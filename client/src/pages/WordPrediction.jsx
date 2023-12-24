import React, { useState } from 'react';

import { Footer, Navbar } from '../components';
import { getPrediction } from '../api/word_prediction';
import Error500 from './Error500';

const WordPrediction = () => {
    const [error, setError] = useState(null);

    const [sentences, setSentences] = useState(['', '', '']);
    const [responseWords, setResponseWords] = useState([]);

    const wordsRef = React.useRef(null);

    const handleInputChange = (index, event) => {
        const newSentences = sentences.map((sentence, i) =>
            i === index ? event.target.value : sentence,
        );
        setSentences(newSentences);
    };

    const getWords = async () => {
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
                setError(err);
            });
    };

    if (error) {
        console.log(error);
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
                                    className="block w-full p-4 m-2 text-gray-900 border border-gray-300 rounded-lg
                                    bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={getWords}
                        className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Find the word
                    </button>
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
