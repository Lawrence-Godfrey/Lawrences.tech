import React, { useEffect, useState } from 'react';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const ArticleView = ({ article }) => {
    const [author, setAuthor] = useState(null);
    const [fullScreenImage, setFullScreenImage] = useState(null);

    useEffect(() => {
        axios.get(`/api/users/${article.author}`)
            .then((response) => {
                setAuthor(response.data.user);
            })
            .catch((error) => console.error('Error:', error));
    }, [article.author]); // re-run this effect if article.author changes

    if (!author) {
        return <div>Loading...</div>; // render a loading state
    }

    const day = new Date(article.createdAt).getDate();
    const month = new Date(article.createdAt).toLocaleString('default', { month: 'long' });
    const year = new Date(article.createdAt).getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    // Custom renderer for images in markdown
    const imageRenderer = {
        img: ({ src, alt }) => (
            <img
                src={src}
                alt={alt}
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setFullScreenImage(src)}
            />
        )
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="wrapper z-0 mt-32 xl:mt-0 flex flex-col justify-center max-w-[800px] px-6">
                    <h1 className="mb-8 mt-16 text-3xl font-extrabold leading-none tracking-normal text-gray-800 md:text-4xl
            lg:text-4xl dark:text-white">
                        { article.title }
                    </h1>

                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <img className="w-10 h-10 rounded-full"
                                src={author.avatar}
                                alt={author.username}
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                            ></img>
                            <div className="font-medium dark:text-white">
                                <div>{author.firstName} {author.lastName}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                Published {formattedDate}
                                </div>
                            </div>
                        </div>
                        <Link to={`/articles/${article.id}/edit`}>
                            <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-gray-700
                            dark:text-white dark:hover:text-gray-300" />
                        </Link>
                    </div>

                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                    {article.description &&
                        <>
                            <p className="text-gray-500 dark:text-gray-400">
                                { article.description }
                            </p>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        </>
                    }
                    <div className="prose mt-10 mb-10">
                        <ReactMarkdown components={imageRenderer}>{article.content}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Full-screen image modal */}
            {fullScreenImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    onClick={() => setFullScreenImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                        onClick={() => setFullScreenImage(null)}
                    >
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                    <img
                        src={fullScreenImage}
                        alt="Full screen view"
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default ArticleView;
