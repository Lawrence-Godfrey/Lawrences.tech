
import { ArticleListView, Footer, Navbar } from '../components';
import { useEffect, useState } from 'react';
import { fetchArticles } from '../api/articles';
import Error500 from './Error500';


const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles()
            .then((articles) => setArticles(articles))
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return <Error500 />;
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 flex min-h-screen">
                <ArticleListView articles={articles} />
            </div>
            <Footer />
        </div>
    );
};


export default ArticlesPage;
