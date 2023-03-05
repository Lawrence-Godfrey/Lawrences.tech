import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Login, Error, Dashboard, Profile, PrivacyPolicy } from './pages';


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
                <Route path="/privacy-policy" element={ <PrivacyPolicy /> } />
                <Route path="*" element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
