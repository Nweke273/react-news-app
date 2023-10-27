import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import NotFound from "./pages/notFound.jsx";
import {NextUIProvider} from "@nextui-org/react";
import Auth from "./middlewares/auth.jsx";
import Guest from "./middlewares/guest.jsx";
import Search from "./pages/search.jsx";

function App() {
    return (
        <NextUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth><Home/></Auth>} />
                    <Route path="/search" element={<Auth><Search/></Auth>} />
                    <Route path="/login" element={<Guest><Login/></Guest>} />
                    <Route path="/register" element={<Guest><Register/></Guest>} />

                    {/* Add a Route for 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </NextUIProvider>
    );
}

export default App;