import NavLink from "./navLink.jsx";
import Logo from "./logo.jsx";
import {useState} from "react";
import ResponsiveNavLink from "./responsiveNavLink.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {useAuth} from "../hooks/useAuth.js";
import {useDispatch} from "react-redux";
import {resetUser} from "../redux/slice/userSlice.js";
import SearchModal from "./modals/search.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const {user} = useAuth();

    const logOut = async () => {
        await dispatch(resetUser());
        navigate("/login");
    }

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <nav className={"bg-gray-base border-b border-gray-100 z-10"}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
               <div className={"flex justify-between items-center h-20"}>
                   <div className={"flex w-full"}>
                       {/* Logo */}
                       <div className={"shrink-0 flex items-center"}>
                           <NavLink to={"/"}>
                                 <Logo />
                            </NavLink>
                       </div>
                       {/* Navigation Links */}
                       <div className={"hidden space-x-8 sm:-my-px sm:ml-10 lg:flex"}>
                           <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
                           <NavLink to="/search" active={location.pathname === "/search"}>Search</NavLink>
                       </div>

                       {/* Settings Dropdown */}
                       <div className="hidden lg:flex sm:items-center sm:ml-6 flex-1 justify-end">
                           <div className="mr-6">
                               <SearchModal />
                           </div>
                           <Dropdown placement="bottom-end" className={""}>
                               <DropdownTrigger>
                                   <Avatar
                                       isBordered
                                       as="button"
                                       className="transition-transform"
                                       src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                   />
                               </DropdownTrigger>
                               <DropdownMenu aria-label="Profile Actions" variant="flat">
                                   <DropdownItem key="profile" className="h-14 gap-2">
                                       <p className="font-semibold">Signed in as</p>
                                       <p className="font-semibold">{user.email}</p>
                                   </DropdownItem>
                                   <DropdownItem key="logout" color="danger" onClick={logOut}>
                                       Log Out
                                   </DropdownItem>
                               </DropdownMenu>
                           </Dropdown>
                       </div>
                   </div>
                   {/* Mobile Menu */}
                   <div className={"-mr-2 flex items-center lg:hidden"}>
                       <SearchModal />
                       <div>
                           <button
                               onClick={toggleMenu}
                               className="ml-4 border inline-flex justify-between relative items-center py-2 px-3 shadow-sm rounded-lg  text-center text-base font-medium leading-5 text-gray-600 "
                           >
                               <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                   <path
                                       className={open ? 'hidden' : 'inline-flex'}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M4 6h16M4 12h16M4 18h16"
                                   />
                                   <path
                                       className={open ? 'inline-flex' : 'hidden'}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M6 18L18 6M6 6l12 12"
                                   />
                               </svg>
                           </button>
                       </div>
                   </div>

               </div>
            </div>
            <div className={`${open ? 'block' : 'hidden'} lg:hidden fixed top-20 right-0 left-0 bottom-0 z-[1000] overflow-y-scroll h-[calc(100%-5rem)] overflow-x-hidden w-screen py-5 bg-white border-t border-gray-200`}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink to={"/"} active={location.pathname === "/"}>Home</ResponsiveNavLink>
                    <ResponsiveNavLink to={"/search"} active={location.pathname === "/search"}>Search</ResponsiveNavLink>
                    <Divider />
                    <button className={"block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold text-gray-600 hover:text-gray-800 hover-bg-gray-50 hover-border-gray-300 focus:outline-none focus-text-gray-800 focus-bg-gray-50 focus-border-gray-300 transition duration-150 ease-in-out"} onClick={logOut}>Logout</button>
                </div>
            </div>
        </nav>
    )
}