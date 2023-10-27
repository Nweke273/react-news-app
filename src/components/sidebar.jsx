import axios from "axios";
import {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth.js";
import {Link} from "react-router-dom";

export default function Sidebar(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
            });
            setData(response.data.articles.articles)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/v1/articles/top-headlines`);
    }, []);
    return <>
        <div className="w-full px-2 md:px-12 my-8 relative">
            <div className={"flex flex-row items-center mb-4"}>
                <h3 className={"font-bold text-xl"}>Top Headlines</h3>
            </div>
            <div className={"flex flex-col"}>
                {loading ? (
                    <p>Loading...</p>
                ) : <>{data.map((article, index) => {
                    return <div key={index} className={"flex flex-row items-center mb-4"}>
                        <div className={"flex-1"}>
                            <Link to={article?.url} target={"_blank"}  className={"text-base leading-6 font-medium text-gray-900 hover:text-blue-600"}>{article.title}</Link>
                        </div>
                    </div>
                })}</>
                }
            </div>
        </div>
    </>
}