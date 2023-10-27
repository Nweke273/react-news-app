import { Link } from 'react-router-dom';

const NavLink = ({ to, children, active }) => {
    const classes = active
        ? 'inline-flex items-center px-1 pt-1 border-b-2 border-skin-600 text-base font-medium leading-5 text-gray-900 focus:outline-none focus-border-skin-700 transition duration-150 ease-in-out'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover-border-gray-300 focus:outline-none focus-text-gray-700 focus-border-gray-300 transition duration-150 ease-in-out';

    return (
        <Link to={to} className={classes}>
            {children}
        </Link>
    );
};

export default NavLink;
