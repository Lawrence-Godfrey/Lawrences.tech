import React, { useEffect, useState } from 'react';

import { Footer, Navbar } from '../components';
import { useParams } from 'react-router-dom';
import ArticleView from '../components/ArticleView';
import { fetchArticle } from '../api/articles';
import Error500 from './Error500';

const ArticlePage = () => {
    const { id } = useParams(); // Get the article ID from the URL

    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticle(id)
            .then((article) => setArticle(article))
            .catch((err) => setError(err));
    }, [id]); // Rerun the effect when the id changes

    if (error) {
        return <Error500 />;
    }

    if (!article) {
        return <p>Loading...</p>; // Show a loading message or spinner while the article is loading
    }

    return (
        <div>
            <Navbar />
            <ArticleView article={article} />
            <Footer />
        </div>
    );
};


export default ArticlePage;
