import React, { useEffect, useState } from 'react';

import { Footer, Navbar } from '../components';
import { useParams } from 'react-router-dom';
import ArticleEditor from '../components/ArticleEditor';
import { fetchArticle } from '../api/articles';
import Error500 from './Error500';

const ArticleEditPage = () => {
    const { id } = useParams(); // Get the article ID from the URL

    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            return; // In the case of an article being created, there is no ID yet.
        }

        fetchArticle(id)
            .then((article) => {
                setArticle(article);
            })
            .catch((err) => setError(err));
    }, [id]); // Rerun the effect when the id changes

    if (error) {
        return <Error500 />;
    }

    return (
        <div>
            <Navbar />
            <ArticleEditor article={article} />
            <Footer />
        </div>
    );
};


export default ArticleEditPage;
