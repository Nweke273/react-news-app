import Input from "../input.jsx";
import Label from "../label.jsx";
import Button from "../button.jsx";
import Select from "../select.jsx";
import SelectItem from "../selectItem.jsx";
import DateTimePicker from "../dateTimePicker.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth.js";
import {useCustomForm} from "../../hooks/useCustomForm.js";
import {useLocation, useNavigate} from "react-router-dom";

export default function SearchCard() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [sources, setSources] = useState({});
    const [categories, setCategories] = useState([]);
    const {user} = useAuth();
    const navigate = useNavigate();

    const initialFormState = {
        keyword: queryParams.get("keyword") || "",
        from_date: queryParams.get("from_date") || "",
        to_date: queryParams.get("to_date") || "",
        category: queryParams.get("category") || "",
        source: queryParams.get("source") || "",
        page: 1,
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
        await navigate(`/search?${queryParams.toString()}`);
        window.location.reload();
    });

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

    useEffect(() => {
        fetchSources(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sources`);
        fetchCategories(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`);
    }, []);

    return <>
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
                    <Select label="Category" name={"category"} value={state.category} onChange={handleChange}>
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
                    <Select label="Source" id="source" name={"source"} value={state.source} onChange={handleChange}>
                        <SelectItem value="" label="select a source" disabled/>
                        {Object.keys(sources).length > 0 ? (
                            Object.keys(sources).map((value) => (
                                <SelectItem key={value} value={value} label={sources[value]} />
                            ))
                        ) : null}
                    </Select>
                </div>
            </div>
            <div className={"flex flex-col md:flex-row"}>
                <div className="mb-3 flex-1">
                    <Label htmlFor={"from_date"} className="block text-sm font-medium text-gray-700"
                           value={"From Date"}/>
                    <DateTimePicker id={"from_date"} name={"from_date"} value={state.from_date}
                                    onChange={handleChange}/>
                </div>
                <div className="mb-3 flex-1 md:ml-3 flex flex-col">
                    <Label htmlFor={"to_date"} className="block text-sm font-medium text-gray-700"
                           value={"To Date"}/>
                    <DateTimePicker id={"to_date"} name={"to_date"} value={state.to_date}
                                    onChange={handleChange}/>
                </div>
            </div>
            <div className={"flex justify-end"}>
                <Button disabled={isDisabled} isLoading={isSubmitting}>
                    Search
                </Button>
            </div>
        </form>
    </>
}