
import { ArticleListView, Footer, Navbar } from '../components';
import { useEffect, useState } from 'react';
import { fetchArticlesWithAuthors } from '../api/articles';
import Error500 from './Error500';


const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticlesWithAuthors()
            .then((articles) => setArticles(articles))
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return <Error500 />;
    }

    return (
        <div>
            <Navbar />
            <ArticleListView articles={articles} />
            <Footer />
        </div>
    );
};


export default ArticlesPage;
