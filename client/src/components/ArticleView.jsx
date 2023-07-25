import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleView = ({ article }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        axios.get(`/api/users/${article.author}`)
            .then((response) => setAuthor(response.data))
            .catch((error) => console.error('Error:', error));
    }, [article.author]); // re-run this effect if article.author changes

    if (!author) {
        return <div>Loading...</div>; // render a loading state
    }

    return (
        <div className="p-4">
            {/* <img src={article.bannerImageUrl} alt={article.title} className="w-full h-64 object-cover mb-4" /> */}
            <h1 className="text-4xl mb-2">{article.title}</h1>
            <div className="flex items-center mb-4">
                <img src={article.author.avatar} alt={article.author.firstName} className="w-8 h-8 rounded-full mr-2"/>
                <div>
                    <p className="text-lg">{article.author.firstName} {article.author.lastName}</p>
                    <p className="text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: article.content }}/>
        </div>
    );
};

export default ArticleView;
