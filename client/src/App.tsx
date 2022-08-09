import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Login, Error } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
