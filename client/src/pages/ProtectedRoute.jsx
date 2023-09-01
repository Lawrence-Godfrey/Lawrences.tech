
import { useAppContext } from '../context/appContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function ProtectedRoute({ children }) {
    const { user } = useAppContext();
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log('ProtectedRoute');
        if (!user) {
            console.log('No user');
            axios.get('/api/auth/me', {
                withCredentials: true,
            }).then((res) => {
                console.log(res.data);
                if (res.data.status === 'success') {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            }).catch((err) => {
                console.log(`Error: ${err}`); // eslint-disable-line no-console
                setAuthenticated(false);
            }).finally(() => {
                setLoading(false);
                console.log('Finally'); // eslint-disable-line no-console
            });
        } else {
            setAuthenticated(true);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authenticated && !loading) {
            console.log('Not authenticated');
            navigate('/login');
        }
    }, [loading, authenticated, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Or your loading spinner here
    }

    return authenticated ? children : null;
};

export default ProtectedRoute;
