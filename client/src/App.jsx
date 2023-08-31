import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    Register, Login, Error404, Dashboard, Profile, PrivacyPolicy, About, ArticlePage, ArticlesPage, ArticleEdit,
} from './pages';


/**
 * Renders the App component, which is the root of the application.
 * @return {JSX.Element}
 * @constructor
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Dashboard /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/privacy-policy" element={ <PrivacyPolicy /> } />
                <Route path="/articles" element={ <ArticlesPage /> } />
                <Route path="/articles/:id" element={ <ArticlePage /> } />
                <Route path="/articles/:id/edit" element={ <ArticleEdit /> } />
                <Route path="/articles/new" element={ <ArticleEdit /> } />
                {/* 404 page must be the last route in the list. */}
                <Route path="*" element={ <Error404 /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
