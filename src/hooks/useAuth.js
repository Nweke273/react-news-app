import { useSelector } from 'react-redux';

export const useAuth = () => {
    const user = useSelector((state) => state.user.user);

    const isAuthenticated = user.isAuthenticated;

    return {
        isAuthenticated,
        user,
    };
};
