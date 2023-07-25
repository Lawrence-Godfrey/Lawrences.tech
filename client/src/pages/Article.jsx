import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Footer, Navbar } from '../components';
import { useParams } from 'react-router-dom';
import ArticleView from '../components/ArticleView';


const Article = () => {
    const { id } = useParams(); // Get the article ID from the URL

    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/articles/${id}`);
                setArticle(response.data.article);
            } catch (error) {
                console.error('Failed to fetch article', error);
            }
        };

        fetchArticle();
    }, [id]); // Rerun the effect when the id changes

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


export default Article;
