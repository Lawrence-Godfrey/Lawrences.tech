import React from 'react';
import ReactMarkdown from 'react-markdown';

const ArticleListView = ({ articles }) => {
    /**
     * Returns the number of days ago the article was published
     * @param {string} dateString - The date the article was published
     * @return {number}
     */
    function daysAgo(dateString) {
        const articleDate = new Date(dateString);
        const currentDate = new Date();
        const diffInMilliseconds = currentDate - articleDate;
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
        return Math.floor(diffInMilliseconds / oneDayInMilliseconds);
    }


    return (
        <div className="py-8 px-4 mx-auto max-w-screen-md min-h-screen lg:py-16 lg:px-6">
            <div className="text-center">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Articles & Blog Posts
                </h2>
                <p className="font-light text-gray-500 mb-8 sm:text-xl dark:text-gray-400">
                    Find articles about about whatever people are writing articles about these days.
                </p>

                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>

            <div className="h-10"></div>

            <div className="text-center">
                <button
                    type="button"
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400
                        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => window.location.href = '/articles/new'}
                >
                    Create
                </button>
            </div>

            <div className="h-10"></div>

            {articles.map((article) => (
                <div key={article.id}>
                    <article className="p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                            <span
                                className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex
                                    items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                <svg
                                    className="mr-1 w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002
                                        2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd">
                                    </path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                        Article
                            </span>
                            <span className="text-sm">
                                {daysAgo(article.createdAt)} days ago
                            </span>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <a href={`/articles/${article.id}`} className="hover:underline">
                                {article.title}
                            </a>
                        </h2>
                        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                            <ReactMarkdown>
                                {article.content.length > 300 ? article.content.substring(0, 300) +
                                    '...' : article.content}
                            </ReactMarkdown>
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    className="w-7 h-7 rounded-full"
                                    src={article.author.avatar}
                                    alt="avatar"
                                />
                                <span className="font-medium dark:text-white">
                                    {article.author.firstName} {article.author.lastName}
                                </span>
                            </div>
                            <a href={`/articles/${article.id}`} className="inline-flex items-center font-medium
                                text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6
                                            6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0
                                            010-1.414z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </a>
                        </div>
                    </article>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </div>
            ))}
        </div>
    );
};

export default ArticleListView;
