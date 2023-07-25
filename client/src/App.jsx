import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Login, Error, Dashboard, Profile, PrivacyPolicy, About, Article } from './pages';


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
                <Route path="/article/:id" element={ <Article /> } />
                <Route path="*" element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
