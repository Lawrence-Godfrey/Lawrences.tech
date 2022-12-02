import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Login, Error, Dashboard } from './pages';
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } >
        </Route>
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
