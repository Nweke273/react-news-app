import BaseLayout from "../layouts/base.jsx";
import {useDisclosure} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../hooks/useAuth.js";
import ArticleCard from "../components/cards/articleCard.jsx";
import Sidebar from "../components/sidebar.jsx";
import Filter from "../components/filter.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "../components/pagination.jsx";

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const filterModal = useDisclosure();
    const [paginationLinks, setPaginationLinks] = useState([]);
    const navigate = useNavigate();

    const fetchData = async (url, newUrl) => {
        const params = new URLSearchParams(newUrl ?? location.search);
        const initialState = {
            page: params.get("page") || params.get("/?page") || 1,
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
                params: initialState
            });
            setData(response.data.articles.data);
            setPaginationLinks(response.data.articles.links);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/v1/articles`);
    }, []);

    const handlePageChange = async (url) => {
        const urlObj = new URL(url);
        const params = urlObj.searchParams;
        const page = params.get("page") || 1;

        // Update the "page" parameter in the query parameters
        queryParams.set("page", page);

        // Construct the new URL with the updated query parameters
        const newURL = `${location.pathname}?${queryParams.toString()}`;

        // Navigate to the new URL
        await navigate(newURL);
        await fetchData(url, newURL);
    };

    return (
        <BaseLayout sidebar={<Sidebar/>}>
            <div className="w-full px-2 md:px-12 my-8 relative">
                <div className={"flex flex-row items-center mb-4"}>
                    <h3 className={"font-bold text-xl"}>News</h3>
                    <div className={"flex-1 flex justify-end"}>
                        <button onClick={filterModal.onOpen}
                                className="ml-4 border inline-flex justify-between relative items-center py-2 px-3 shadow-sm rounded-lg  text-center text-base font-medium leading-5 text-gray-600 outline-none"
                        >
                            Set News Preference
                        </button>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : <>
                        {Object.values(data).map((article, key) => (
                            <ArticleCard key={key} article={article} className={"mb-3"}/>
                        ))}
                        <div className={"flex flex-row items-center mt-4 justify-end"}>
                            <Pagination links={paginationLinks} handlePageChange={handlePageChange}/>
                        </div>
                    </>
                    }
                </div>
            </div>
            <Filter modal={filterModal}/>
        </BaseLayout>
    )
}
