import Sidebar from "../components/sidebar.jsx";
import BaseLayout from "../layouts/base.jsx";
import {useEffect, useState} from "react";
import ArticleCard from "../components/cards/articleCard.jsx";
import Label from "../components/label.jsx";
import Input from "../components/input.jsx";
import Select from "../components/select.jsx";
import SelectItem from "../components/selectItem.jsx";
import DateTimePicker from "../components/dateTimePicker.jsx";
import Button from "../components/button.jsx";
import {useAuth} from "../hooks/useAuth.js";
import {useCustomForm} from "../hooks/useCustomForm.js";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "../components/pagination.jsx";


export default function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [data, setData] = useState([]);
    const [sources, setSources] = useState({});
    const [categories, setCategories] = useState([]);
    const {user} = useAuth();
    const [paginationLinks, setPaginationLinks] = useState([]);
    const navigate = useNavigate();

    const initialFormState = {
        keyword: queryParams.get("keyword") || "",
        from_date: queryParams.get("from_date") || "",
        to_date: queryParams.get("to_date") || "",
        category: queryParams.get("category") || "",
        source: queryParams.get("source") || "",
        page: queryParams.get("page") || 1,
    };

    const {
        state,
        isSubmitting,
        isDisabled,
        handleChange,
        handleSubmit
    } = useCustomForm(initialFormState, async (formData) => {
        // Update query parameters based on form data
        queryParams.set("keyword", formData.keyword);
        queryParams.set("from_date", formData.from_date);
        queryParams.set("to_date", formData.to_date);
        queryParams.set("category", formData.category);
        queryParams.set("source", formData.source);
        queryParams.set("page", formData.page);

        // Update the URL with new query parameters
        navigate(`${location.pathname}?${queryParams.toString()}`);

        let formURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/articles`;

        const res = await axios.get(formURL, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                Accept: "application/json",
            },
            params: formData
        });

        if (res.status === 200) {
            setData(res.data.articles.data)
            setPaginationLinks(res.data.articles.links);
        }
    });

    const fetchCategories = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
            });
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchSources = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
            });
            setSources(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const pageLoad = async (url) => {
        const params = new URLSearchParams(url ?? location.search);
        const initialState = {
            keyword: params.get("keyword") || "",
            from_date: params.get("from_date") || "",
            to_date: params.get("to_date") || "",
            category: params.get("category") || "",
            source: params.get("source") || "",
            page: params.get("page") || 1,
        }
        try {
            const formUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/articles`
            const response = await axios.get(formUrl, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    Accept: "application/json",
                },
                params: initialState,
            });
            setData(response.data.articles.data);
            setPaginationLinks(response.data.articles.links);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchSources(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sources`);
        fetchCategories(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`);
        pageLoad();
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
        navigate(newURL);
        await pageLoad(newURL);
    };
    console.log(state)

    return (
        <BaseLayout sidebar={<Sidebar/>}>
            <div className={"w-full px-2 md:px-12 my-8 relative"}>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-3 px-4 py-5 sm:px-6">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <Label htmlFor="keyword" className="block text-sm font-medium text-gray-700"
                                       value={"Keyword"}/>
                                <Input id="keyword" className="block mt-1 w-full" type="text" name="keyword"
                                       placeholder="Search by keyword"
                                       value={state.keyword}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className={"flex flex-col md:flex-row"}>
                                <div className="mb-3 flex-1">
                                    <Select label="Category" name={"category"} value={state.category}
                                            onChange={handleChange}>
                                        <SelectItem value="" label="select a category" disabled/>
                                        {categories && categories.length > 0 ? (
                                            categories.map((category, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={category}
                                                    label={category}
                                                />
                                            ))
                                        ) : null}
                                    </Select>
                                </div>
                                <div className="mb-3 flex-1 md:ml-3 flex flex-col">
                                    <Select label="Source" id="source" name={"source"} value={state.source}
                                            onChange={handleChange}>
                                        <SelectItem value="" label="select a source" disabled/>
                                        {Object.keys(sources).length > 0 ? (
                                            Object.keys(sources).map((value) => (
                                                <SelectItem key={value} value={value} label={sources[value]}/>
                                            ))
                                        ) : null}
                                    </Select>
                                </div>
                            </div>
                            <div className={"flex flex-col md:flex-row"}>
                                <div className="mb-3 flex-1">
                                    <Label htmlFor={"from_date"} className="block text-sm font-medium text-gray-700"
                                           value={"From Date"}/>
                                    <DateTimePicker name={"from_date"} id={"from_date"} value={state.from_date}
                                                    onChange={handleChange}/>
                                </div>
                                <div className="mb-3 flex-1 md:ml-3 flex flex-col">
                                    <Label htmlFor={"to_date"} className="block text-sm font-medium text-gray-700"
                                           value={"To Date"}/>
                                    <DateTimePicker name={"to_date"} id={"to_date"} value={state.to_date}
                                                    onChange={handleChange}/>
                                </div>
                            </div>
                            <div className={"flex justify-end"}>
                                <Button disabled={isDisabled} isLoading={isSubmitting}>
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                {isSubmitting ? (
                    <p>Searching...</p>
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
        </BaseLayout>
    )
}