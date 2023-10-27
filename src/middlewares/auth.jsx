import {Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Auth({ children }) {
    const {isAuthenticated} = useAuth();
    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children
}
