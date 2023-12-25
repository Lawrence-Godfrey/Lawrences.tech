import { Footer, Navbar } from '../components';

import wordPredictLogo from '../assets/images/word_predictor_logo_small.png';
import React from 'react';

/**
 * Renders the project page, which contains a header and a list of projects
 * with links to their respective pages.
 * @return {Element}
 * @constructor
 */
const Projects = () => {
    return (
        <div>
            <Navbar/>
            <div className="py-8 px-4 mx-auto max-w-screen-md min-h-screen lg:py-16 lg:px-6">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900
                    dark:text-white">
                        Projects
                    </h2>
                    <p className="font-light text-gray-500 mb-8 sm:text-xl dark:text-gray-400">
                        Here are some of the projects I&apos;ve worked on.
                    </p>

                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </div>

                <a href="projects/tipofyourtongue"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow mt-10
                    md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800
                    dark:hover:bg-gray-700">
                    <img className="object-cover object-[50% 20%] w-full rounded-t-lg h-96 md:h-auto md:w-48
                    md:rounded-none md:rounded-l-lg"
                    src={wordPredictLogo} alt="Word Predictor Logo"/>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Tip of Your Tongue
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Ever had a word that you just can&apos;t think
                            of? This app helps you find it using some machine learning wizardry
                        </p>
                    </div>
                </a>
            </div>
            <Footer/>
        </div>
    );
};

export default Projects;
