import {Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Guest({ children }) {
    const {isAuthenticated} = useAuth();
    let location = useLocation();

    if(isAuthenticated) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
    return children
}
