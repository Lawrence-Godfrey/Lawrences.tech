import {useAppContext} from "../context/appContext";
import {Navigate} from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const { user } = useAppContext();
    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;