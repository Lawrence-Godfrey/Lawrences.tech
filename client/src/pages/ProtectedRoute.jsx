import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAppContext();
    if (!user) {
        axios.get('/api/auth/me', {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data);
            if (res.data.status === 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return <Component {...rest} />;
            } else {
                return <Navigate to="/login" />;
            }
        }).catch((err) => {
            console.log(err);
            return <Navigate to="/login" />;
        });
    } else {
        return <Component {...rest} />;
    }
};

export default ProtectedRoute;
